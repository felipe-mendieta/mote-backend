/* eslint-disable no-console */
const getConnection = require('../connection');
const User = require('../entities/user.entity');

const initSeedDB = async () => {
  try {
    const conn = await getConnection();
    await conn.connection.dropDatabase();

    const felipeUser = new User({
      name: 'Felipe',
      email: 'felipe98mz@mail.com',
      password: 'changeme',
      avatar: `https://api.lorem.space/image/face?w=480&h=480&r=${Math.random()}`,
      gender: "Hombre"
    });
    await felipeUser.save();

    const zuleUser = new User({
      name: 'Zulema',
      email: 'zule@mail.com',
      password: 'changeme',
      avatar: `https://api.lorem.space/image/face?w=480&h=480&r=${Math.random()}`,
      gender: "Mujer"
    });
    await zuleUser.save();

    const valeUser = new User({
      name: 'Valentina',
      email: 'vale@mail.com',
      password: 'changeme',
      avatar: `https://api.lorem.space/image/face?w=480&h=480&r=${Math.random()}`,
      gender: "Mujer"
    });
    await valeUser.save();

    const santiUser = new User({
      name: 'Santiago',
      email: 'santi@mail.com',
      password: 'changeme',
      avatar: `https://api.lorem.space/image/face?w=480&h=480&r=${Math.random()}`,
      gender: "Prefiero no decirlo"
    });
    await santiUser.save();

  } catch (error) {
    console.error(error);
  }
};

module.exports = initSeedDB;
