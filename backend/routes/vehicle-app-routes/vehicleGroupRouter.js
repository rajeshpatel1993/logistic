const VehicleGroupModel = require('../models/vehicleGroupModel');

const vehicleGroupRouter = (app) => {
    app.post('/addVehicleGroup', (req, res) => {
        const vehicleGroup = new VehicleGroupModel(req.body);
        vehicleGroup.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editVehicleGroup', (req, res) => {
        const vehicleGroupId = req.body.vehicleGroupId;
        const vehicleGroupId = req.body.vehicleGroupId;
        const modifiedVehicleGroup = req.body.modifiedVehicleGroup;
        VehicleGroupModel.findOneAndUpdate({ vehicleGroupId: vehicleGroupId, empId: vehicleGroupId },
            { ...modifiedVehicleGroup }, { new: true }, (err, resource) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }
            })
    });

    app.get('/getAllVechileGroup', (req, res) => {
        VehicleGroupModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteVehicleGroup', (req, res) => {
        const vehicleGroupId = req.body.vehicleGroupId;
        VehicleGroupModel.findOneAndDelete({ vehicleGroupId: vehicleGroupId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = vehicleGroupRouter;