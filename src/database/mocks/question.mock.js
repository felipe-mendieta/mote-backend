const { faker } = require('@faker-js/faker/locale/es');
// Función para generar una pregunta aleatoria
const generateOneQuestion = () => {
  const questionTypes = ['Likert', 'Multiple Option', 'Single Option'];
  const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

  const questionText = faker.lorem.sentence();

  if (randomType === 'Likert') {
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
  if (randomType === 'Multiple Option' || randomType === 'Single Option') {
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

// function generateOneQuestion(){
//   return {
//     type: "Likert",
//     question: "¿Cómo calificaría la calidad de nuestros productos?",
//     answers: [
//       {"option": 1, "text": "Muy insatisfecho", "correct" : false},
//       {"option": 2, "text": "Insatisfecho","correct" : false},
//       {"option": 3, "text": "Neutral","correct" : false},
//       {"option": 4, "text": "Satisfecho","correct" : false},
//       {"option": 5, "text": "Muy satisfecho","correct" : false}
//     ]
//   };
// }
// Función para generar varias preguntas
const generateManyQuestions = (size = 6) => {
  const questions = [];
  for (let index = 0; index < size; index++) {
    // const newQuestion=new Question(generateOneQuestion());
    // questions.push(newQuestion);
    questions.push(generateOneQuestion());
  }
  return questions;
};

module.exports = { generateOneQuestion, generateManyQuestions };
