const EmployeeEducationModel = require('../models/employeeEducationModel');

const employeeEducationRouter = (app) => {
    app.post('/addEmployeeEducation', (req, res) => {
        const employeeEducation = new EmployeeEducationModel(req.body);
        employeeEducation.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editEmployeeEducation', (req, res) => {
        const employeeEducationId = req.body.employeeEducationId;
        const employeeId = req.body.employeeId;
        const modifiedEmployeeEducation = req.body.modifiedEmployeeEducation;
        EmployeeEducationModel.findOneAndUpdate({ employeeEducationId: employeeEducationId, empId: employeeId}, 
            { ...modifiedEmployeeEducation }, { new: true }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });

    app.get('/getEmployeeEducationByEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        EmployeeEducationModel.find({ empId: employeeId }, (err, resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }   
        })
    });

    app.post('/deleteEmployeeEducation', (req, res) => {
        const employeeEducationId = req.body.employeeEducationId;
        EmployeeEducationModel.findOneAndDelete({ employeeEducationId: employeeEducationId }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    })
    return app;
}

module.exports = employeeEducationRouter;