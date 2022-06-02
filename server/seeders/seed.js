const db = require('../config/connection');
const { Reader } = require('../models');
const readerSeeds = require('./readerSeeds.json');

db.once('open', async () => {
  try {
    await Reader.deleteMany({});
    await Reader.create(readerSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
