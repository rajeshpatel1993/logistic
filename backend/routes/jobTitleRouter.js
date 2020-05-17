const JobTitleModel = require('../models/jobTitleModel');
const uuid = require('uuid/v4');

const jobTitleRouter = (app) => {
    app.post('/addJobTitle', (req, res) => {
        const jobTitleList = req.body.jobTitleList;
        const withId = jobTitleList.map((jobTitle) => ({ jobTitleId: uuid, jobTitle}))
        JobTitleModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getJobTitleList', (req, res) => {
        JobTitleModel.find({}, (err,resource) => {
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

module.exports = jobTitleRouter;