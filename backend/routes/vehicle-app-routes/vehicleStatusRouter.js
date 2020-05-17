const VehicleStatusModel = require('../models/vehicleStatusModel');
const uuid = require('uuid/v4');

const vehicleStatusRouter = (app) => {
    app.post('/addVehicleStatus', (req, res) => {
        const vehicleStatus = new VehicleStatusModel(req.body);
        vehicleStatus.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });    

    app.get('/getAllVehicleStatus', (req, res) => {
        VehicleStatusModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteVehicleStatus', (req, res) => {
        const vehicleStatusId = req.body.vehicleStatusId;
        VehicleStatusModel.findOneAndDelete({ vehicleStatusId: vehicleStatusId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = vehicleStatusRouter;