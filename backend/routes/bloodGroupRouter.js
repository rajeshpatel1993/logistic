const BloodGroupModel = require('../models/bloodGroupModel');
const uuid = require('uuid/v4');

const bloodGroupRouter = (app) => {
    app.post('/addBloodGroups', (req, res) => {
        const bloodGroupsList = req.body.bloodGroupList;
        const withId = bloodGroupsList.map((bloodGroup) => ({ bloodGroupId: uuid, bloodGroup}))
        BloodGroupModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getBloodGroupsList', (req, res) => {
        BloodGroupModel.find({}, (err,resource) => {
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

module.exports = bloodGroupRouter;