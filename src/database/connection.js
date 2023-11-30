/* eslint-disable no-console */
const mongoose = require('mongoose');
const config = require('../config/config');
//root:<password>@engagement.w0cwynd.mongodb.net/

const URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}`;

async function getConnection() {
  try {
    const connection = await mongoose.connect(`${URI}?authSource=admin&readPreference=primary`);
    return connection;
  } catch (error) {
    console.error(URI);
    console.error('Database connection error: ' + error);
    return null;
  }
}

module.exports = getConnection;
