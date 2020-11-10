const express = require('express');
const db = require('../../db.js');
const workRouter = express.Router({mergeParams: true});

// attach a list of all the work to the request
workRouter.all('*', (req, res, next) => {
    const minion = req.minion;
    const work = db.getAllFromDatabase('work');
    const minionsWork = work.filter(el => el.id === minion.id);

    if(minionsWork) {
        req.minionsWork = minionsWork;
        next();
    } else {
        res.sendStatus(404);
    }
});

// GET all work
workRouter.get('/', (req, res, next) => {
    res.send(req.minionsWork);
});

// POST a new work entry
workRouter.post('/', (req, res, next) => {
    const success = db.addToDatabase('work', req.body);
       
    if (success) {
        res.status(201).send(success);
    } else {
        res.sendStatus(400);
    }
});

// UPDATE a single work by id
workRouter.put('/:workId', (req, res, next) => {
    
    const newWork = req.body;

    // check if work's minion id's minion exists
    const minionExists = req.minions.find(minion => minion.id === newWork.minionId);
    
    // minion exists: update, else: bad request
    if (minionExists) {
        db.updateInstanceInDatabase('work', newWork);
        res.status(201).send(newWork);
    } else {
        res.sendStatus(400);
    }

});

// DELETE a single work by id
workRouter.delete('/:workId', (req, res, next) => {
    db.deleteFromDatabasebyId('work', req.params.id);
    res.status(204).send();
})

module.exports = workRouter;