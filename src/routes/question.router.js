const express = require('express');
const router = express.Router();
const QuestionService = require('./../services/question.service');
const { createQuestionDto, getQuestionByIdDto, updateQuestionDto } = require('./../dtos/question.dtos');
const validatorHandler = require('../middlewares/validator.handler');

const questionService = new QuestionService();

// Ruta para obtener todas las preguntas
router.get('/', async (_, res, next) => {
  try {
    const questions = await questionService.getAll();
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener una pregunta por ID
router.get('/:id',
  validatorHandler(getQuestionByIdDto, 'params')
  , async (req, res, next) => {
    try {
      const { id } = req.params;
      const question = await questionService.getById(id);
      res.status(200).json(question);
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
      res.status(201).json(newQuestion);
    } catch (error) {
      next(error);
    }
  });

// Ruta para actualizar una pregunta por ID
router.put('/:id',
  validatorHandler(getQuestionByIdDto, 'params'),
  validatorHandler(updateQuestionDto, 'body')
  , async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedQuestion = await questionService.update(id, body);
      res.status(200).json(updatedQuestion);
    } catch (error) {
      next(error);
    }
  });

// Ruta para actualizar parcialmente una pregunta por ID (PATCH)
router.patch('/:id',
  validatorHandler(getQuestionByIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updatedQuestion = await questionService.patch(id, body);
      res.status(200).json(updatedQuestion);
    } catch (error) {
      next(error);
    }
  });

// Ruta para eliminar una pregunta por ID (DELETE)
router.delete('/:id',
  validatorHandler(getQuestionByIdDto, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedQuestion = await questionService.deleteById(id);
      res.status(200).json(deletedQuestion);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
