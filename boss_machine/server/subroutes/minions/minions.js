const express = require('express');
const { request } = require('../../../server.js');
const minionsRouter = express.Router();
const db = require('../../db.js');
const workRouter = require('./work.js');

// get all minions from the database and attach them to the request
minionsRouter.all('*', (req, res, next) => {
    const minions = db.getAllFromDatabase('minions');
    req.minions = minions;
    next();
});

// if an id has provided, try to find a minion with a matching id within the db
minionsRouter.param('id', (req, res, next) => {
    const minion = db.getFromDatabaseById('minions', req.params.id);
    if(minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('The minion with the required id has not been found');
    }
    
});

 minionsRouter.use('/:id/work', workRouter);

// GET all minions from the database
minionsRouter.get('/', (req, res, next) => {
    res.send(req.minions);
});

// GET a single minion by his or her id
minionsRouter.get('/:id', (req, res, next) => {
    res.send(req.minion);
});

// POST a new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = db.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// UPDATE an existing minion by its id
minionsRouter.put('/:id', (req, res, next) => {
    const updatedMinion = db.updateInstanceInDatabase('minions', req.body);
    if(updatedMinion) {
        res.status(201).send(updatedMinion);
    } else {
        next(new Error('Something went wrong updating the minion'));
    }
});

// DELETE an existing minion by its id
minionsRouter.delete('/:id', (req, res, next) => {
    const deletionSuccessful = db.deleteFromDatabasebyId('minions', req.params.id);
    if(deletionSuccessful) {
        res.status(204).send();
    } else {
        next(new Error());
    }
});

module.exports = minionsRouter;