const { Thing } = require('../models');

module.exports.createThing = async (req, res, next) => {
    try {
        const { body } = req;
        const newThing = await Thing.create(body);
        if (newThing) {
            return res.status(201).send({ data: newThing });
        }
        //bad practice
        return res.status(400), send({ data: 'Bad request' }); 
    } catch (error) {
        next(error);
    }
};

module.exports.create = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
},

module.exports.create = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
},

module.exports.create = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
}