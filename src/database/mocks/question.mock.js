const { faker } = require('@faker-js/faker/locale/es');
const typePoll = require('../../../utils/enums/poll-type.enum');

// Función para generar una pregunta aleatoria
const generateOneQuestion = () => {
  const questionTypes = [typePoll.likert, typePoll.multipleOption, typePoll.singleOption];
  const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  const questionText = faker.lorem.sentence();

  if (randomType === typePoll.likert) {
    // Genera una escala de Likert con opciones predefinidas
    const likertScale = [
      'Muy insatisfecho',
      'Insatisfecho',
      'Neutral',
      'Satisfecho',
      'Muy satisfecho',
    ];

    const answers = likertScale.map((text, option) => ({
      option: option + 1,
      text,
      correct: false, // En una escala Likert, ninguna opción es "correcta"
    }));

    return {
      type: randomType,
      question: questionText,
      answers,
    };
  }

  const answers = [];
  if (randomType === typePoll.multipleOption || randomType === typePoll.singleOption) {
    for (let i = 1; i <= 3; i++) {
      answers.push({
        option: i,
        text: faker.lorem.words(3),
        correct: i === 1, // Hace que la primera opción sea siempre la correcta
      });
    }
  }
  return {
    type: randomType,
    question: questionText,
    answers,
  };
};

const generateManyQuestions = (size = 6) => {
  const questions = [];
  for (let index = 0; index < size; index++) {
    questions.push(generateOneQuestion());
  }
  return questions;
};

module.exports = { generateOneQuestion, generateManyQuestions };
