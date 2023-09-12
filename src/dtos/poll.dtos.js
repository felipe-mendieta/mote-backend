const Joi = require('joi');
const {createQuestionDto} = require('./question.dtos');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const pollTitle = Joi.string().min(5).max(100); // Valida la longitud del título de la encuesta
const startDate = Joi.date().iso(); // Valida el formato de fecha ISO
// eslint-disable-next-line no-unused-vars
const endDate = Joi.date().iso(); // Valida el formato de fecha ISO

const createPollDto = Joi.object({
  pollTitle: pollTitle.required(),
  startDate: startDate.required(),
  // endDate: endDate.required(),
  questions: Joi.array().items(createQuestionDto), // Valida un array de preguntas utilizando el esquema de pregunta definido anteriormente
});

const updatePollDto = Joi.object({
  pollTitle,
  startDate
});
const getPollDto = Joi.object({
  id: id.required(),
});
module.exports = {createPollDto, updatePollDto, getPollDto};
