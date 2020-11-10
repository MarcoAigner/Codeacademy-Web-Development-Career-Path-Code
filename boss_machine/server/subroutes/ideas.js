const express = require('express');
const checkMillionDollarIdea = require('../checkMillionDollarIdea.js');
const ideasRouter = express.Router();
const db = require('../db.js');

// get all ideas from the database and attach them to the request
ideasRouter.all('*', (req, res, next) => {
    const ideas = db.getAllFromDatabase('ideas');
    req.ideas = ideas;
    next();
});

// if an id has been provided, attach the idea with that id to the request
ideasRouter.param('id', (req, res, next, id) => {
    const idea = db.getFromDatabaseById('ideas', req.params.id);
    if(idea) { // an idea matching the id has been found
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

// GET all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(req.ideas);
});

// GET an idea by its id
ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

// POST: check if a new idea is valid and profitable
ideasRouter.post('/', checkMillionDollarIdea);

// POST a new minion
ideasRouter.post('/', (req, res, next) => {
    const newIdea = db.addToDatabase('ideas', req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        next(new Error('Something went wrong'));
    }
});

// UPDATE an idea by its id
ideasRouter.put('/:id', (req, res, next) => {
    const updatedIdea = db.updateInstanceInDatabase('ideas', req.body);
    if(updatedIdea) {
        res.status(201).send(updatedIdea);
    } else {
        next(new Error('Somemthing went wrong while updating the idea'));
    }
});

// DELETE a minion by its id
ideasRouter.delete('/:id', (req, res, next) => {
    const deletionSuccessful = db.deleteFromDatabasebyId('ideas', req.params.id);
    if (deletionSuccessful) {
        res.status(204).send();
    } else {
        next(new Error('Something went wrong while deleting the idea'));
    }
});

module.exports = ideasRouter;