const express = require('express');
const { createThing } = require('./controllers/thing.controller');
const app = express();

app.use(express.json());

app.post('/things', createThing);

module.exports = app;