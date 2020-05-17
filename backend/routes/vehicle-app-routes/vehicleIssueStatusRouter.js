const VehicleIssueStatusModel = require('../models/vehicleIssueStatusModel');

const vehicleIssueStatusRouter = (app) => {
    app.post('/addVehicleIssueStatus', (req, res) => {
        const vehicleIssueStatus = new VehicleIssueStatusModel(req.body);
        vehicleIssueStatus.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editVehicleIssueStatus', (req, res) => {
        const vehicleIssueStatusId = req.body.vehicleIssueStatusId;
        const vehicleIssueStatusId = req.body.vehicleIssueStatusId;
        const modifiedVehicleIssueStatus = req.body.modifiedVehicleIssueStatus;
        VehicleIssueStatusModel.findOneAndUpdate({ vehicleIssueStatusId: vehicleIssueStatusId, empId: vehicleIssueStatusId },
            { ...modifiedVehicleIssueStatus }, { new: true }, (err, resource) => {
                if (err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }
            })
    });

    app.get('/getAllVehicleIssueStatus', (req, res) => {
        VehicleIssueStatusModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteVehicleIssueStatus', (req, res) => {
        const vehicleIssueStatusId = req.body.vehicleIssueStatusId;
        VehicleIssueStatusModel.findOneAndDelete({ vehicleIssueStatusId: vehicleIssueStatusId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    })
    return app;
}

module.exports = vehicleIssueStatusRouter;