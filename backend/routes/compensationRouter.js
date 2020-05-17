const CompensationModel = require('../models/compensationModel');

const compensationRouter = (app) => {
    app.post('/addCompensation', (req, res) => {
        const compensation = new CompensationModel(req.body);
        compensation.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editCompensation', (req, res) => {
        const compensationId = req.body.compensationId;
        const employeeId = req.body.employeeId;
        const modifiedCompensation = req.body.modifiedCompensation;
        CompensationModel.findOneAndUpdate({ compensationId: compensationId, empId: employeeId}, 
            { ...modifiedCompensation }, { new: true }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });

    app.get('/getCompensationByEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        CompensationModel.find({ empId: employeeId }, (err, resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }   
        })
    });

    app.post('/deleteCompensation', (req, res) => {
        const compensationId = req.body.compensationId;
        CompensationModel.findOneAndDelete({ compensationId: compensationId }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    })
    return app;
}

module.exports = compensationRouter;