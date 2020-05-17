const JobHistoryModel = require('../models/jobHistoryModel');

const jobHistoryRouter = (app) => {
    app.post('/addJobHistory', (req, res) => {
        const jobHistory = new JobHistoryModel(req.body);
        jobHistory.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editJobHistory', (req, res) => {
        const jobHistoryId = req.body.jobHistoryId;
        const employeeId = req.body.employeeId;
        const modifiedJobHistory = req.body.modifiedJobHistory;
        JobHistoryModel.findOneAndUpdate({ jobHistoryId: jobHistoryId, empId: employeeId}, 
            { ...modifiedJobHistory }, { new: true }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });

    app.get('/getJobHistoryByEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        JobHistoryModel.find({ empId: employeeId }, (err, resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }   
        })
    });

    app.post('/deleteJobHistory', (req, res) => {
        const jobHistoryId = req.body.jobHistoryId;
        JobHistoryModel.findOneAndDelete({ jobHistoryId: jobHistoryId }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    })
    return app;
}

module.exports = jobHistoryRouter;