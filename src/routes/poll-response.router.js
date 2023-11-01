const express = require('express');
const router = express.Router();
const PollResponseService = require('../services/poll-response.service');

const pollResponseService = new PollResponseService();

// Ruta para guardar una respuesta de encuesta
router.post('/', async (req, res, next) => {
  try {
    const { pollId, questionId, option } = req.body;
    const savedResponse = await pollResponseService.create(pollId, questionId, option);
    res.status(201).json(savedResponse);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener todas las respuestas para una pregunta específica
router.get('/question/:questionId', async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const responses = await pollResponseService.getResponsesForQuestion(questionId);
    res.json(responses);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener todas las respuestas para una encuesta específica
router.get('/poll/:pollId', async (req, res, next) => {
  try {
    const { pollId } = req.params;
    const responses = await pollResponseService.getResponsesForPoll(pollId);
    res.json(responses);
  } catch (error) {
    next(error);
  }
});

// Otras rutas según tus necesidades

// ...

module.exports = router;
