const Joi = require('joi');
const typePoll = require('../../utils/enums/poll-type.enum');
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const questionText = Joi.string().min(5).max(255); // Valida la longitud del texto de la pregunta
const questionType = Joi.string().valid(typePoll.likert, typePoll.multipleOption,typePoll.singleOption); // Valida el tipo de pregunta
const answerOption = Joi.number().min(1).max(10); // Valida las opciones de respuesta
const answerText = Joi.string().min(1).max(255); // Valida el texto de la respuesta
const isCorrect = Joi.boolean(); // Valida si la respuesta es correcta o no

const createQuestionDto = Joi.object({
  type: questionType.required(),
  question: questionText.required(),
  answers: Joi.array().items(
    Joi.object({
      option: answerOption.required(),
      text: answerText.required(),
      correct: isCorrect.required(),
    })
  ),
});
const updateQuestionDto = Joi.object({
  type: questionType.required(),
  question: questionText.required(),
  answers: Joi.array().items(
    Joi.object({
      option: answerOption.required(),
      text: answerText.required(),
      correct: isCorrect.required(),
    })
  ),
});
const getQuestionByIdDto = Joi.object({
  id: id.required(),
});
module.exports = { createQuestionDto, getQuestionByIdDto, updateQuestionDto };
