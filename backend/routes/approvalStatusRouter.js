const ApprovalStatusModel = require('../models/approvalStatusModel');
const uuid = require('uuid/v4');

const approvalStatusRouter = (app) => {
    app.post('/addApprovalStatus', (req, res) => {
        const approvalStatusList = req.body.approvalStatusList;
        const withId = approvalStatusList.map((approvalStatus) => ({ approvalStatusId: uuid, approvalStatus}))
        ApprovalStatusModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getApprovalStatusList', (req, res) => {
        ApprovalStatusModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
}

module.exports = approvalStatusRouter;