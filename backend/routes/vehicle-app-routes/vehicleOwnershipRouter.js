const VehicleOwnershipModel = require('../models/vehicleOwnershipModel');
const uuid = require('uuid/v4');

const vehicleOwnershipRouter = (app) => {
    app.post('/addVehicleOwnership', (req, res) => {
        const vehicleOwnership = new VehicleOwnershipModel(req.body);
        vehicleOwnership.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editVehicleOwnership', (req, res) => {
        const vehicleOwnershipId = req.body.vehicleOwnershipId;
        const vehicleNoteId = req.body.vehicleNoteId;
        const modifiedVehicleOwnership = req.body.modifiedVehicleOwnership;
        VehicleOwnershipModel.findOneAndUpdate({ vehicleOwnershipId: vehicleOwnershipId, empId: vehicleNoteId },
            { ...modifiedVehicleOwnership }, { new: true }, (err, resource) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }
            })
    });

    app.get('/getAllVehicleOwnership', (req, res) => {
        VehicleOwnershipModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteVehicleOwnership', (req, res) => {
        const vehicleOwnershipId = req.body.vehicleOwnershipId;
        VehicleOwnershipModel.findOneAndDelete({ vehicleOwnershipId: vehicleOwnershipId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = vehicleOwnershipRouter;