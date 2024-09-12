const express = require('express');
const {
  createThing,
  getAllThings,
  getThingByPK,
  updateThingByPK,
  deleteThingByPK,
} = require('../controllers/thing.controller');

const routerThing = express.Router();

// routing Thing
routerThing.post('/', createThing);
routerThing.get('/', getAllThings);

routerThing
  .route('/:idThing')
  .get(getThingByPK)
  .put(updateThingByPK)
  .delete(deleteThingByPK);

module.exports = routerThing;