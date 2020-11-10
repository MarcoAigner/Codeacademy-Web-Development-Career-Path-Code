const checkMillionDollarIdea = (req, res, next) => {

    const {numWeeks, weeklyRevenue} = req.body;

    const totalYield = req.body.numWeeks * req.body.weeklyRevenue;

    if (!numWeeks || !weeklyRevenue || isNaN(totalYield) || totalYield < 1000000) {
        res.sendStatus(400);
    } else {
        next();
    }

};
    
// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
