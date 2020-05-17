const WorkLocationModel = require('../models/workLocationModel');
const uuid = require('uuid/v4');

const workLocationRouter = (app) => {
    app.post('/addWorkLocation', (req, res) => {
        const workLocationList = req.body.workLocationList;
        const withId = workLocationList.map((workLocation) => ({ workLocationId: uuid, workLocation}))
        WorkLocationModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getWorkLocationList', (req, res) => {
        WorkLocationModel.find({}, (err,resource) => {
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

module.exports = workLocationRouter;