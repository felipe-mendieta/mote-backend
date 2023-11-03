const express = require('express');
const router = express.Router();
const PollResponseService = require('../services/poll-response.service');

const pollResponseService = new PollResponseService();

// Ruta para guardar una respuesta de encuesta
router.post('/', async (req, res, next) => {
  try {
    const pollResponseData = req.body;
    const newPollResponse = await pollResponseService.create(pollResponseData);
    res.status(201).json(newPollResponse);
  } catch (error) {
    next(error);
  }
});
// Ruta para obtener una respuesta de encuesta por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const pollResponse = await pollResponseService.getById(id);
    res.json(pollResponse);
  } catch (error) {
    next(error);
  }
});
// Ruta para obtener todas las respuestas de encuesta relacionadas con una encuesta específica
router.get('/poll/:pollId', async (req, res, next) => {
  try {
    const { pollId } = req.params;
    const responses = await pollResponseService.getResponsesForPoll(pollId);
    res.json(responses);
  } catch (error) {
    next(error);
  }
});
// Ruta para actualizar una respuesta de encuesta por ID
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const pollResponseData = req.body;
    const updatedPollResponse = await pollResponseService.update(id, pollResponseData);
    res.json(updatedPollResponse);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar una respuesta de encuesta por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await pollResponseService.delete(id);
    res.status(200).json({ message: 'Respuesta de encuesta eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
});
// Otras rutas según tus necesidades

// ...

module.exports = router;
