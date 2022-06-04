const db = require('../config/connection');
const { Reader, Passage } = require('../models');
const readerSeeds = require('./readerSeeds.json');
const passageSeeds = require('./passageSeeds.json');

db.once('open', async () => {
  try {
    await Passage.deleteMany({});
    await Passage.create(passageSeeds);
    await Reader.deleteMany({});
    await Reader.create(readerSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
