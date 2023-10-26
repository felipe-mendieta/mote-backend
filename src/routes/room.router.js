const express = require('express');
const router = express.Router();
const RoomService = require('../services/room.service');
const { generateJWT } = require('./../helpers/generate-jwt.helper');
const { UserContainer } = require('../models/classes/user.container');
const roomService = new RoomService();
const crypto = require('crypto');
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
    const { roomCode } = req.params;
    const roomDetails = await roomService.getDetails(roomCode);
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
    const { roomCode } = req.params;
    const exists = await roomService.exists(roomCode);
    if (exists) {
      //Aqui se debe reemplazar con el id del usuario cuando ya esté la parte de logueo con google
      /***************************************************************************** */
      const userRandom = crypto.randomUUID();
      const userContainer = new UserContainer();
      userContainer.addUser({
        id: userRandom,
        name: 'Anonimo',
        roomCode: roomCode
      });
      /***************************************************************************** */
      token = await generateJWT(userRandom,roomCode);
    }
    res.status(200).json({
      ok: exists,
      token: token
    });
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
