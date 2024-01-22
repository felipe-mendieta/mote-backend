const express = require('express');
const router = express.Router();
const RoomService = require('../services/room.service');
const {DashboardEmotionsService} = require('../services/dashboard-emotions.service');
const { generateJWT } = require('./../helpers/generate-jwt.helper');
const { UserContainer } = require('../models/classes/user.container');
const roomService = new RoomService();
const dashboardEmotionsService = new DashboardEmotionsService();
const crypto = require('crypto');
const { DashboardActivityService } = require('../services/dashboard-activity.service');
const dashboardActivityService = new DashboardActivityService();
// Ruta para obtener todas las salas
router.get('/', async (req, res, next) => {
  try {
    const rooms = await roomService.getAll();
    res.json(rooms);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener detalles de una sala
router.get('/:roomCode', async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const roomDetails = await roomService.getDetails(roomId);

    res.json(roomDetails);
  } catch (error) {
    next(error);
  }
});
// Ruta para crear una nueva sala
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const newRoom = await roomService.create(name);
    //initialize data for show in dashboard
    await dashboardEmotionsService.create({ roomId: newRoom._id });//init dashboard emotions data
    await dashboardActivityService.createAll( newRoom._id );//init dashboard activity data


    res.status(201).json(newRoom); // Código de estado 201 para "Created"
  } catch (error) {
    next(error);
  }
});
router.put(
  '/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const room = await roomService.update(id, body);
      res.status(200).json(room); // Código de estado 200 para "OK"
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedRoom = await roomService.patch(id, body);
      res.status(200).json(updatedRoom); // Código de estado 200 para "OK"
    } catch (error) {
      next(error);
    }
  });
// Ruta para verificar si una sala existe
router.get('/:roomCode/exists', async (req, res, next) => {
  try {
    let token = '';
    let userRandom= '';
    //get header rol from request
    const { rol } = req.headers;
    const { roomCode } = req.params;
    const exists = await roomService.exists(roomCode);
    if (exists) {
      //Aqui se debe reemplazar con el id del usuario cuando ya esté la parte de logueo con google
      /***************************************************************************** */
      userRandom = crypto.randomUUID();//aqui se reemplazaria con el ID del usuario guardado en la base de datos
      const userContainer = new UserContainer();
      /***************************************************************************** */
      token = await generateJWT(userRandom);
      userContainer.addUser({
        uuid: userRandom,
        token: token,
        rol: rol
      });

    res.status(200).json({
      ok: true,
      token: token,
      userId: userRandom,
      roomId: exists._id
    });

  } else {
      res.json({
        ok: false,
      });
  }
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar parcialmente una sala (PATCH)
router.patch('/:roomCode', async (req, res, next) => {
  try {
    const { roomCode } = req.params;
    const { newName } = req.body;
    const patchedRoom = await roomService.patch(roomCode, newName);
    res.json(patchedRoom);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar una sala
router.delete('/:roomCode', async (req, res, next) => {
  try {
    const { roomCode } = req.params;
    await roomService.deleteRoom(roomCode);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
