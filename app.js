const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

app.use(router);

app.use((err, req, res) => {
  console.log(err);
});

module.exports = app;