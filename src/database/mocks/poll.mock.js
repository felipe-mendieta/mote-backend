const { faker } = require('@faker-js/faker/locale/es');

// Función para generar una encuesta aleatoria con preguntas
const generateOnePoll = () => {
  const pollTitle = faker.lorem.words(3);
  const startDate = faker.date.past();
  const endDate = faker.date.future();
  // const questions = []; //se genera en el randomSeed ya que neesitamos extraer los Ids desde la base de datos.
  return {
    pollTitle,
    startDate,
    endDate,
  };
};

// Función para generar varias encuestas
const generateManyPolls = (size = 6) => {
  const polls = [];
  for (let index = 0; index < size; index++) {
    polls.push(generateOnePoll());
  }
  return [...polls];
};

module.exports = { generateOnePoll, generateManyPolls };
