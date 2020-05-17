const MaritalModel = require('../models/martialStatus');
const uuid = require('uuid/v4');

const maritalRouter = (app) => {
    app.post('/addMarital', (req, res) => {
        const maritalList = req.body.maritalList;
        const withId = maritalList.map((marital) => ({ maritalId: uuid, marital}))
        MaritalModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getMaritalList', (req, res) => {
        MaritalModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    return app;
}

module.exports = maritalRouter;