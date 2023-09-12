/* eslint-disable no-undef */

const initSeedDB = require('./../src/database/seeds/init.seed');

(async () => {
  try {
    await initSeedDB();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  process.exit(0);
})();
