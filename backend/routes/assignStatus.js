const AssignStatusModel = require('../models/assignStatusModel');
const uuid = require('uuid/v4');

const assignStatusRouter = (app) => {
    app.post('/addAssignStatus', (req, res) => {
        const assignStatusList = req.body.assignStatusList;
        const withId = assignStatusList.map((assignStatus) => ({ assignStatusId: uuid, assignStatus}))
        AssignStatusModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getAssignStatusList', (req, res) => {
        AssignStatusModel.find({ oranizationId: req.query.oranizationId }, (err,resource) => {
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

module.exports = assignStatusRouter;