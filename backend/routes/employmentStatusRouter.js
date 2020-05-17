const EmployementStatusModel = require('../models/employmentStatusModel');
const uuid = require('uuid/v4');

const employementStatusRouter = (app) => {
    app.post('/addEmployementStatus', (req, res) => {
        const employementStatusList = req.body.employementStatusList;
        const withId = employementStatusList.map((employementStatus) => ({ employementStatusId: uuid, employementStatus}))
        EmployementStatusModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getEmployementStatusList', (req, res) => {
        EmployementStatusModel.find({}, (err,resource) => {
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

module.exports = employementStatusRouter;