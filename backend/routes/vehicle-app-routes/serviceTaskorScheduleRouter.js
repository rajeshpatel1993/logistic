const ServiceTaskorScheduleModel = require('../models/serviceTaskorScheduleModel');

const serviceTaskorScheduleRouter = (app) => {
    app.post('/addServiceTaskorSchedule', (req, res) => {
        const serviceTaskorSchedule = new ServiceTaskorScheduleModel(req.body);
        serviceTaskorSchedule.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editServiceTaskorSchedule', (req, res) => {
        const serviceTaskorScheduleId = req.body.serviceTaskorScheduleId;
        const employeeId = req.body.employeeId;
        const modifiedServiceTaskorSchedule = req.body.modifiedServiceTaskorSchedule;
        ServiceTaskorScheduleModel.findOneAndUpdate({ serviceTaskorScheduleId: serviceTaskorScheduleId, empId: employeeId },
            { ...modifiedServiceTaskorSchedule }, { new: true }, (err, resource) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }
            })
    });

    app.get('/getServiceTaskorScheduleByVehicleType', (req, res) => {
        const vehicleTypeId = req.body.vehicleTypeID;
        ServiceTaskorScheduleModel.find({ vehicleTypeID: vehicleTypeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllServiceTaskorSchedule', (req, res) => {
        ServiceTaskorScheduleModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteServiceTaskorSchedule', (req, res) => {
        const serviceTaskorScheduleId = req.body.serviceTaskorScheduleId;
        ServiceTaskorScheduleModel.findOneAndDelete({ serviceTaskorScheduleId: serviceTaskorScheduleId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = serviceTaskorScheduleRouter;