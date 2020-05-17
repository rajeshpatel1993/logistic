const VehicleModel = require('../models/vehicleModel');

const vehicleRouter = (app) => {
    app.post('/addVehicle', (req, res) => {
        var vehicle = new VehicleModel(req.body);
        vehicle.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getVehiclesByEmployee', (req, res) => {
        const employeeId = req.query.employeeId;
        VehicleModel.find({empId: employeeId}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/assignVehicleToEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const vehicleId = req.body.vehicleId;
        VehicleModel.findOneAndUpdate({vehicleId: vehicleId}, { empId: employeeId }, { new: true }, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/unassignVehicleToEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const vehicleId = req.body.vehicleId;
        VehicleModel.findOneAndUpdate({vehicleId: vehicleId, empId: employeeId}, { empId: null }, { new: true }, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });


    app.get('/getAllVehicles', (req, res) => {
        VehicleModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteVehicle', (req, res) => {
        const vehicleId = req.body.vehicleId;
        VehicleModel.findOneAndDelete({ vehicleId: vehicleId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateVehicle', (req, res) => {
        const employeeId = req.body.vehicleId;
        const modifiedVehicle = req.body.updatedVehicle;
        VehicleModel.findOneAndUpdate({ employeeID: employeeId }, { ...modifiedVehicle }, { new: true}, (err, response) => {
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


module.exports = vehicleRouter;
