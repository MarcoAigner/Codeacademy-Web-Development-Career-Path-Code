const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    console.log('Entered the qpiRouter');
    res.send('Entered the apiRouter');
})


module.exports = apiRouter;
