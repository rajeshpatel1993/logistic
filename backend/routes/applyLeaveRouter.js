const ApplyLeaveModel = require('../models/applyLeaveModel');
const EmployeeLeaveModel = require('../models/employeeLeaveModel');

const applyLeaveRouter = (app) => {
    app.post('/addApplyLeave', (req, res) => {
        const applyLeave = new ApplyLeaveModel(req.body.leavedata);
        applyLeave.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editApplyLeave', (req, res) => {
        const applyLeaveId = req.body.applyLeaveId;
        const employeeId = req.body.employeeId;
        const modifiedApplyLeave = req.body.modifiedApplyLeave;
        ApplyLeaveModel.findOneAndUpdate({ applyLeaveId: applyLeaveId, empId: employeeId}, 
            { ...modifiedApplyLeave }, { new: true }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });

    app.get('/getleavebalance', (req, res) => {
        console.log(req.query);
        const { organizationId, employeeId } = req.query;
        console.log(Number(employeeId));
        EmployeeLeaveModel.findOne({ empID: Number(employeeId), organizationId }, (err, leaveData) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.send(leaveData).status(200);
            }
        })
    })

    app.get('/myleaverequests', (req, res) => {
        const employeeId = req.body.employeeId;
        ApplyLeaveModel.find({ empId: employeeId }, (err, resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }   
        })
    });

    app.post('/deleteApplyLeave', (req, res) => {
        const applyLeaveId = req.body.applyLeaveId;
        ApplyLeaveModel.findOneAndDelete({ applyLeaveId: applyLeaveId }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });


    app.get('/getleavedata', (req, res) => {
        const organizationId = req.query.organizationId;
        const status = req.query.status;
        console.log(organizationId+ '' +status);
        ApplyLeaveModel.aggregate([
            {
                $match: { organizationId: organizationId, approvalStatus: status }
            },
            {
                $lookup: {
                    from: "employees",
                    let: { employeeID: "$employeeID" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$employeeID", "$$employeeID"]
                                }
                            }
                        },
                        { $project: { _id: 0, employeeID: 1, employeeCode: 1, emailAddress: 1, firstName: 1, lastName: 1  } }
                    ],
                    as: "employeeDetails"
                }
            },
            { $unwind: "$employeeDetails"},
            {
                $lookup: {
                    from: "leavetypes",
                    let: { leaveTypeId: "$leaveType" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$leaveTypeId", "$$leaveTypeId"]
                                }
                            }
                        },
                        { $project: { _id: 0, leaveTypeId: 1, leaveType: 1 }}
                    ],
                    as: "leaveTypeDetails"
                }
            },
            { $unwind: "$leaveTypeDetails"},
            {
                $lookup: {
                    from: "leavedata",
                    let: { employeeID: "$employeeID" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$empID", "$$employeeID"]
                                }
                            }
                        },
                        { $project: { _id: 0, employeeLeaveId: 1, empID: 1, sickLeaveBalance: 1, vactionLeaveBal: 1, compOffLeaveBal: 1 }}
                    ],
                    as: "employeeLeaveDetails"
                }
            },
            { $unwind: "$employeeLeaveDetails" }
        ]).exec((err, leaveData) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.send(leaveData).status(200);
            }
        })
    })

    app.post('/changeStatus', (req, res) => {
        const leaveIds = req.body.leaveIds;
        const leaveStatus = req.body.leaveStatus;
        //TODO: Employee Leave Details Update
        console.log(leaveIds);
        console.log(leaveStatus);
        const employeeDetails = req.body.employeeDetails;
        ApplyLeaveModel.updateMany({ applyLeaveId: { $in: leaveIds }}, {$set: { approvalStatus: leaveStatus }}, { new: true }, (err, documents) => {
            if(err) {
                console.log('Error in updating leave status');
                console.log(err);
                res.json({ message: 'Error in updating leave status' }).status(501);
            } else {
                
                //TODO: Employee Leave Details Update
                /* const promiseArray = [];
                employeeDetails.forEach((employee) => {
                    promiseArray.push(EmployeeLeaveModel.findOneAndUpdate({ empID: employee.empId }, employee.updateValues));
                })
                Promise.all(promiseArray).then((results) => {
                    res.json({ message: 'success' }).status(200);
                }).catch((err) => {
                    console.log('Error in updating employee leave details');
                    console.log(err);
                    res.json({ message: 'Error in updating employee leave details' }).status(501);
                }) */
                res.json({ message: 'success' }).status(200);
            }
        })
    })
    return app;
}

module.exports = applyLeaveRouter;