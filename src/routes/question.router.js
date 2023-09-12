const express = require('express');
const router = express.Router();
const QuestionService = require('./../services/question.service');
const { createQuestionDto, getQuestionDto, updateQuestionDto } = require('./../dtos/question.dtos');
const validatorHandler = require('../middlewares/validator.handler');

const questionService = new QuestionService();

// Ruta para obtener todas las preguntas
router.get('/', async (_, res, next) => {
  try {
    const questions = await questionService.getAll();
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener una pregunta por ID
router.get('/:id',
  validatorHandler(getQuestionDto, 'params')
  , async (req, res, next) => {
    try {
      const { id } = req.params;
      const question = await questionService.getById(id);
      res.json(question);
    } catch (error) {
      next(error);
    }
  });

// Ruta para crear una nueva pregunta
router.post('/',
  validatorHandler(createQuestionDto, 'body')
  , async (req, res, next) => {
    try {
      const body = req.body;
      const newQuestion = await questionService.create(body);
      res.json(newQuestion);
    } catch (error) {
      next(error);
    }
  });

// Ruta para actualizar una pregunta por ID
router.put('/:id',
  validatorHandler(getQuestionDto, 'params'),
  validatorHandler(updateQuestionDto, 'body')
  , async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedQuestion = await questionService.update(id, body);
      res.json(updatedQuestion);
    } catch (error) {
      next(error);
    }
  });

// Ruta para actualizar parcialmente una pregunta por ID (PATCH)
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedQuestion = await questionService.patch(id, body);
    res.json(updatedQuestion);
  } catch (error) {
    next(error);
  }
});

// Ruta para eliminar una pregunta por ID (DELETE)
router.delete('/:id',
  validatorHandler(getQuestionDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await questionService.deleteById(id);
      res.json(deletedQuestion);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
