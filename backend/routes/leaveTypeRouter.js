const LeaveTypeModel = require('../models/leaveTypeModel');
const uuid = require('uuid/v4');

const leaveTypeRouter = (app) => {
    app.post('/addLeaveTypes', (req, res) => {
        const leaveTypesList = req.body.leaveTypeList;
        const withId = leaveTypesList.map((leaveType) => ({ leaveTypeId: uuid, leaveType}))
        LeaveTypeModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getLeaveTypesList', (req, res) => {
        const organizationId = req.query.organizationId;
        console.log(organizationId);
        LeaveTypeModel.find({ organizationId: organizationId }, (err,resource) => {
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

module.exports = leaveTypeRouter;