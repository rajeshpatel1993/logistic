const EmployeeDocumentModel = require('../models/employeeDocumentModel');

const employeeDocumentRouter = (app) => {
    app.post('/addEmployeeDocument', (req, res) => {
        var employeeDocument = new EmployeeDocumentModel(req.body);
        employeeDocument.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getEmployeeDocumentsByEmployee', (req, res) => {
        const employeeId = req.query.employeeId;
        EmployeeDocumentModel.find({empId: employeeId}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/assignEmployeeDocumentToEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const employeeDocumentId = req.body.employeeDocumentId;
        EmployeeDocumentModel.findOneAndUpdate({employeeDocumentId: employeeDocumentId}, { empId: employeeId }, { new: true }, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/unassignEmployeeDocumentToEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const employeeDocumentId = req.body.employeeDocumentId;
        EmployeeDocumentModel.findOneAndUpdate({employeeDocumentId: employeeDocumentId, empId: employeeId}, { empId: null }, { new: true }, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });


    app.get('/getAllEmployeeDocuments', (req, res) => {
        EmployeeDocumentModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteEmployeeDocument', (req, res) => {
        const employeeDocumentId = req.body.employeeDocumentId;
        EmployeeDocumentModel.findOneAndDelete({ employeeDocumentId: employeeDocumentId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateEmployeeDocument', (req, res) => {
        const employeeId = req.body.employeeDocumentId;
        const modifiedEmployeeDocument = req.body.updatedEmployeeDocument;
        EmployeeDocumentModel.findOneAndUpdate({ employeeID: employeeId }, { ...modifiedEmployeeDocument }, { new: true}, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    });

    return app;
}


module.exports = employeeDocumentRouter;