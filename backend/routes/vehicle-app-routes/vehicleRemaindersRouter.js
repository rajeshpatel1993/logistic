const VehicleNotesModel = require('../models/vehicleRemaindersModel');
const uuid = require('uuid/v4');

const vehicleRemaindersRouter = (app) => {
    app.post('/addVehicleRemainders', (req, res) => {
        const vehicleRemainders = new VehicleRemaindersModel(req.body);
        vehicleRemainders.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editVehicleRemainders', (req, res) => {
        const vehicleRemaindersId = req.body.vehicleRemaindersId;
        const vehicleNoteId = req.body.vehicleNoteId;
        const modifiedVehicleRemainders = req.body.modifiedVehicleRemainders;
        VehicleRemaindersModel.findOneAndUpdate({ vehicleRemaindersId: vehicleRemaindersId, empId: vehicleNoteId },
            { ...modifiedVehicleRemainders }, { new: true }, (err, resource) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }
            })
    });

    app.get('/getAllVehicleRemainders', (req, res) => {
        VehicleRemaindersModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.get('/getVehicleRemaindersByVehicleType', (req, res) => {
        const vehicleTypeId = req.body.vehicleTypeID;
        VehicleRemaindersModel.find({ vehicleTypeID: vehicleTypeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/deleteVehicleRemainders', (req, res) => {
        const vehicleRemaindersId = req.body.vehicleRemaindersId;
        VehicleRemaindersModel.findOneAndDelete({ vehicleRemaindersId: vehicleRemaindersId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = vehicleRemaindersRouter;