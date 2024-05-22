/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('../config/config');
//root:<password>@engagement.w0cwynd.mongodb.net/

const URI = `mongodb://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

async function getConnection() {
  try {
    return await mongoose.connect(`${URI}?authSource=admin&readPreference=primary`);
  } catch (error) {
    console.error(URI);
    console.error('Database connection error: ' + error);
    return null;
  }
}

module.exports = getConnection;
