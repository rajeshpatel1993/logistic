const EmployeeModel = require('../models/employeeModel');
const { multer, upload } = require('../firebase-config');

const employeeRouter = (app) => {

    app.post('/addEmployee',
        multer.fields([{ name: 'fitnessCopy' }, { name: 'passportCopy' }, { name: 'ninCopy' }, { name: 'gopCopy' }, { name: 'offerLetterCopy' }]),
        (req, res) => {
            console.log('Incoming');
            var employee = new EmployeeModel(req.body);
            employee.save((err, resource) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    let updateObj = { employeeCode: `TM${resource.employeeID}` };
                    if (req.files && Object.keys(req.files).length > 0) {
                        const promiseArray = [];
                        Object.keys(req.files).forEach((fileKey) => {
                            console.log(fileKey);
                            console.log(req.files[fileKey][0]);
                            promiseArray.push(upload(req.files[fileKey][0], `${updateObj.employeeCode}_${fileKey}`, fileKey));
                        })
                        Promise.all(promiseArray).then(([...values]) => {
                            values.forEach((object) => {
                                updateObj = Object.assign({}, updateObj, object);
                            })
                            console.log(updateObj);
                        }).catch((err) => {
                            console.log('Inside Error');
                            console.log(err);
                        }).finally(() => {
                            console.log(resource.employeeID)
                            EmployeeModel.findOneAndUpdate({ employeeID: resource.employeeID },
                                { $set: updateObj }, { new: true }, (err, updatedRes) => {
                                    if (err) {
                                        res.send(err).status(501);
                                    } else {
                                        console.log(updatedRes);
                                        let message = '';
                                        if ((Object.keys(updateObj).length - 1) === Object.keys(req.files).length) {
                                            message = 'Employee Created'
                                        } else {
                                            message = 'Employee Created.. Files Not Uploaded';
                                        }
                                        console.log(message);
                                        res.json({ message, resource: updatedRes }).status(200);
                                    }
                                })
                        })
                    } else {
                        EmployeeModel.findOneAndUpdate({ employeeID: resource.employeeId },
                            { $set: updateObj }, { new: true }, (err, response) => {
                                if (err) {
                                    res.send(err).status(501);
                                } else {
                                    console.log(response);
                                    res.json({ message: 'success', resource: response }).status(200);
                                }
                            })
                    }
                }
            })
        });

    app.get('/searchEmployee', (req, res) => {
        const regex = new RegExp(`^${req.query.searchString}`);
        console.log(regex);
        EmployeeModel.find({ employeeCode: { $regex: regex, $options: 'i' } },
            { _id: 0, employeeCode: 1, employeeID: 1, firstName: 1, lastName: 1 },
            (err, employees) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    /* console.log(employees); */
                    res.send(employees).status(200);
                }
            })
    })

    app.get('/getAllEmployees', (req, res) => {
        EmployeeModel.find({ organizationId: req.query.organizationId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.send(resource).status(200);
            }
        });
    });

    app.get('/getEmployeeDetails', (req, res) => {
        const employeeeId = req.query.employeeId;
        const organizationId = req.query.organizationId;
        EmployeeModel.findOne({ organizationId, employeeID: employeeeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        })
    })

    /**
     * @param employeeId String
     * Employee Id needs to be passed in request body for deleting
     */
    app.post('/deleteEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        EmployeeModel.findOneAndDelete({ employeeID: employeeId }, (err, response) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateEmployeeDetails', (req, res) => {
        const employeeId = req.body.employeeId;
        const modifiedEmployee = req.body.employee;
        EmployeeModel.findOneAndUpdate({ employeeID: employeeId }, { ...modifiedEmployee }, (err, response) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.send(response).status(200);
            }
        })
    });

    app.post('/updateEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const updateFields = req.body.updateFields;
        EmployeeModel.findOneAndUpdate({ employeeID: employeeId },
            { $set: updateFields }, { new: true }, (err, response) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    res.send(response).status(200);
                }
            })
    })


    app.post('/uploadFiles', 
        multer.fields([{ name: 'fitnessCopy' }, { name: 'passportCopy' }, { name: 'ninCopy' }, { name: 'gopCopy' }, { name: 'offerLetterCopy' }]),
        (req, res) => {
            const requestObj = req.body;
            const requestFiles = req.files;
            EmployeeModel.findOne({ employeeID: requestObj.employeeId }, (err, employee) => {
                if(err) {
                    res.json({ message: 'Employee Not Found'}).status(404);
                } else {
                    if (req.files && Object.keys(req.files).length > 0) {
                        const promiseArray = [];
                        let updateObj = {};
                        Object.keys(req.files).forEach((fileKey) => {
                            console.log(fileKey);
                            console.log(req.files[fileKey][0]);
                            promiseArray.push(upload(req.files[fileKey][0], `${employee.employeeCode}_${fileKey}`, fileKey));
                        })
                        Promise.all(promiseArray).then(([...values]) => {
                            values.forEach((object) => {
                                updateObj = Object.assign({}, updateObj, object);
                            })
                            console.log(updateObj);
                            EmployeeModel.findOneAndUpdate({ employeeID: employee.employeeID },
                                { $set: updateObj }, { new: true }, (err, updatedRes) => {
                                    if (err) {
                                        res.send(err).status(501);
                                    } else {
                                        console.log(updatedRes);
                                        let message = 'Files Updated Successfully';
                                        console.log(message);
                                        res.json({ message, resource: updatedRes }).status(200);
                                    }
                                })
                        }).catch((err) => {
                            console.log('Inside Error');
                            console.log(err);
                            res.send({ message:  'something bad happened'}).status(501);
                        })
                    }
                }
            })
    })

    return app;
}


module.exports = employeeRouter;