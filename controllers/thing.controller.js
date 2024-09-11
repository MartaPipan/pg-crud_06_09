const { Thing } = require('../models');

module.exports.createThing = async (req, res, next) => {
  try {
    const { body } = req;
    const [newThing] = await Thing.create(body);
    if (newThing) {
      return res.status(201).send({ data: newThing });// newThing---->format json/www.jsonapi.org(data, errors, meta)
    }
    //bad practice
    return res.status(400).send({ data: 'Bad request' });
  } catch (error) {
    next(error);
  }
};
