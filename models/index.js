const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const config = require('../config/db.json');
const dbConfig = config[process.env.NODE_ENV || 'development'];
const client = new Client(dbConfig);
const currentFileName = path.basename(__filename);

client.connect();
process.on('beforeExit', () => {
  client.end();
});

const db = {
  client,
};

fs.readdirSync(__dirname)
  .filter(
    (fileName) => /.*\.js$/.test(fileName) && fileName !== currentFileName
  )
  .forEach((fileName) => {
    const absPath = path.resolve(__dirname, fileName);
    const Model = require(absPath);
    Model.client = client;
    db[Model.name] = Model;
  });

module.exports = db;