const { faker } = require('@faker-js/faker/locale/es');

const generateOneActivity = () => {
  const options = ["Sueño", "No entiendo"];
  const randomValue = options[Math.floor(Math.random() * options.length)];
  return {
    activityType: `${randomValue}`,
    recordDate: faker.date.recent(),
  }
}

const generateManyActivities = (size = 30) => {
  const activities = [];
  for (let index = 0; index <= size; index++) {
    activities.push(generateOneActivity());
  }
  return [...activities];
}

module.exports = { generateOneActivity, generateManyActivities };

