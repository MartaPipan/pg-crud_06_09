const express = require('express');
const {
    createThing,
    getAllThings,
    getThingByPK,
    updateThingByPK,
    deleteThingByPK
} = require('./controllers/thing.controller');

const app = express();

app.use(express.json());

// Маршрути
app.post('/things', createThing);
app.get('/things', getAllThings);
app.route('/things/:idThing')
    .get(getThingByPK)
    .put(updateThingByPK)
    .delete(deleteThingByPK);

module.exports = app;
