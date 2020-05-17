const VehicleStatusModel = require('../models/vehicleTypeModel');
const uuid = require('uuid/v4');

const vehicleTypeRouter = (app) => {
    app.post('/addVehicleType', (req, res) => {
        const vehicleType = new VehicleTypeModel(req.body);
        vehicleType.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllVehicleType', (req, res) => {
        VehicleTypeModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteVehicleType', (req, res) => {
        const vehicleTypeId = req.body.vehicleTypeId;
        VehicleTypeModel.findOneAndDelete({ vehicleTypeId: vehicleTypeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = vehicleTypeRouter;