const express = require('express');
const router = express.Router();
const RoomService = require('../services/room.service');

const roomService = new RoomService();

// Ruta para obtener detalles de una sala
router.get('/:roomCode', async (req, res, next) => {
  try {
    const { roomCode } = req.params;
    const roomDetails = await roomService.getRoomDetails(roomCode);
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

// Ruta para verificar si una sala existe
router.get('/:roomCode/exists', async (req, res, next) => {
  try {
    const { roomCode } = req.params;
    const exists = await roomService.roomExists(roomCode);
    res.json({ exists });
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
