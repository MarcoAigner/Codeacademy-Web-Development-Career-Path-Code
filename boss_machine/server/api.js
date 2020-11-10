const express = require('express');
const apiRouter = express.Router();
const minionsRouter = require('./subroutes/minions.js');
const ideasRouter = require('./subroutes/ideas.js');
const meetingsRouter = require('./subroutes/meetings.js');

apiRouter.use('/minions', minionsRouter);

apiRouter.use('/ideas', ideasRouter);

apiRouter.use('/meetings', meetingsRouter);

apiRouter.get('/', (req, res, next) => {
    console.log('Entered the qpiRouter');
    res.send('Entered the apiRouter');
})


module.exports = apiRouter;
