const StateModel = require('../models/stateModel');
const uuid = require('uuid/v4');

const stateRouter = (app) => {
    app.post('/addState', (req, res) => {
        const stateList = req.body.stateList;
        const withId = stateList.map((state) => ({ stateId: uuid, state}))
        StateModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getStateList', (req, res) => {
        StateModel.find({}, (err,resource) => {
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

module.exports = stateRouter;