const { faker } = require('@faker-js/faker/locale/es');

const generateOneUser = () => {
  return {
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
    gender: faker.person.gender(),
    status: faker.datatype.boolean(),
    google: faker.datatype.boolean(),
    idGoogle: faker.string.uuid()
  }
}

const generateManyUsers = (size = 5) => {
  const users = [];
  for (let index = 0; index <= size; index++) {
    users.push(generateOneUser());
  }
  return [...users];
}

module.exports = { generateOneUser, generateManyUsers };
