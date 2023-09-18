const express = require('express');
const router = express.Router();
const PollService = require('./../services/poll.service');
const { createPollDto, updatePollDto, getPollByIdDto } = require('./../dtos/poll.dtos');
const validatorHandler = require('../middlewares/validator.handler');
const pollService = new PollService();

// Ruta para obtener todas las encuestas
router.get('/', async (_, res, next) => {
  try {
    const polls = await pollService.getAll();
    res.status(200).json(polls);  // Código de estado 200 para "OK"
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener una encuesta por ID
router.get('/:id',
  validatorHandler(getPollByIdDto),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const poll = await pollService.getById(id);
      res.status(200).json(poll);
    } catch (error) {
      next(error);
    }
  });

// Ruta para crear una nueva encuesta
router.post('/',
  validatorHandler(createPollDto, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPoll = await pollService.create(body);
      res.status(201).json(newPoll);  // Código de estado 201 para "Created"
    } catch (error) {
      next(error);
    }
  });

// Ruta para actualizar una encuesta por ID
router.put('/:id',
  validatorHandler(getPollByIdDto, 'params'),
  validatorHandler(updatePollDto, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedPoll = await pollService.update(id, body);
      res.status(200).json(updatedPoll);
    } catch (error) {
      next(error);
    }
  });

// Ruta para actualizar parcialmente una encuesta por ID (PATCH)
router.patch('/:id',
  validatorHandler(getPollByIdDto),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedPoll = await pollService.patch(id, body);
      res.status(200).json(updatedPoll);
    } catch (error) {
      next(error);
    }
  });

// Ruta para eliminar una encuesta por ID (DELETE)
router.delete('/:id',
  validatorHandler(getPollByIdDto),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedPoll = await pollService.deleteById(id);
      res.status(200).json(deletedPoll);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
