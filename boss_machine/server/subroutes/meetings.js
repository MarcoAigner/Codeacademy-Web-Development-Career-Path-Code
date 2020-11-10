const express = require('express');
const { addToDatabase } = require('../db.js');
const meetingsRouter = express.Router();
const db = require('../db.js');

// attach a list of all meetings to the request
meetingsRouter.all('*', (req, res, next) => {
    const meetings = db.getAllFromDatabase('meetings');
    req.meetings = meetings;
    next();
});

// GET all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(req.meetings);
});

// POST a new meeting
meetingsRouter.post('/', (req, res, next) => {
   const newMeeting = db.createMeeting();
   const meetingAdded = db.addToDatabase('meetings', newMeeting);
   if (meetingAdded) {
       res.status(201).send(newMeeting);
   } else {
       next(new Error('Something went wrong'));
   }
});

// DELETE all meetings
meetingsRouter.delete('/', (req, res, next) => {
    const deletionSuccessful = db.deleteAllFromDatabase('meetings');
    if (deletionSuccessful) {
        res.status(204).send();
    } else {
        next(new Error('Something went wrong'));
    }
});

module.exports = meetingsRouter;