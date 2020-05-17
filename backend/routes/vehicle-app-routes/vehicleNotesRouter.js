const VehicleNotesModel = require('../models/vehicleNotesModel');
const uuid = require('uuid/v4');

const vehicleNotesRouter = (app) => {
    app.post('/addVehicleNotes', (req, res) => {
        const vehicleNotes = new VehicleNotesModel(req.body);
        vehicleNotes.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editVehicleNotes', (req, res) => {
        const vehicleNotesId = req.body.vehicleNotesId;
        const vehicleNoteId = req.body.vehicleNoteId;
        const modifiedVehicleNotes = req.body.modifiedVehicleNotes;
        VehicleNotesModel.findOneAndUpdate({ vehicleNotesId: vehicleNotesId, empId: vehicleNoteId },
            { ...modifiedVehicleNotes }, { new: true }, (err, resource) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }
            })
    });
    
    app.get('/getAllVehicleNotes', (req, res) => {
        VehicleNotesModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.get('/getVehicleNotesByVehicleType', (req, res) => {
        const vehicleTypeId = req.body.vehicleTypeID;
        VehicleNotesModel.find({ vehicleTypeID: vehicleTypeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getVehicleNotesByEmployee', (req, res) => {
        const employeeID = req.body.empId;
        VehicleNotesModel.find({ empId: employeeID }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/deleteVehicleNotes', (req, res) => {
        const vehicleNotesId = req.body.vehicleNotesId;
        VehicleNotesModel.findOneAndDelete({ vehicleNotesId: vehicleNotesId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = vehicleNotesRouter;