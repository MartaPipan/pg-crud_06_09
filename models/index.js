const { Client } = require('pg');
const fs = require('pg');
const path = require('path');
const config = require('../config/db.json');
const dbConfig = config[process.env.NODE_ENV || 'development'];
const client = new Client(dbConfig);
currentFileName = path.basename(__filename);

const db = {
    client,   // alike [Thing.name]:Thing
}

client.connect();

process.on('beforeExit', () => {
    client.end();
});

fs.readdirSync(__dirname)
    .filter(
        (fileName) =>
            /.*\.js$/.test
                (fileName) & fileName !== currentFileName
)
    .forEach((fileName) => {
        const absPath = path.resolve(__dirname, fileName);
        const Model = require(absPath);
        Model.client = client;
        db[Model.name] = Model;
    });

module.exports = db;