/* eslint-disable no-console */
const getConnection = require('../connection');
const User = require('../entities/user.entity');
const { generateManyUsers } = require('../mocks/user.mock');

const randomSeedDB = async () => {
  try {
    const conn = await getConnection();
    await conn.connection.dropDatabase();
    const mockUsers = generateManyUsers();
    const users = await User.insertMany(mockUsers);

    const promises = users.map(async (user) => {
      // eslint-disable-next-line no-unused-vars
      const userId = user._id;
    });
    Promise.all(promises);
  } catch (error) {
    console.error(error);
  }
};


module.exports = randomSeedDB;
