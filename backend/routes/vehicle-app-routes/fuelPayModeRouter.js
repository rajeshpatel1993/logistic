const FuelPayModeModel = require('../models/fuelPayModeModel');

const fuelPayModeRouter = (app) => {
    app.post('/addFuelPayMode', (req, res) => {
        const fuelPayMode = new FuelPayModeModel(req.body);
        fuelPayMode.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editFuelPayMode', (req, res) => {
        const fuelPayModeId = req.body.fuelPayModeId;
        const employeeId = req.body.employeeId;
        const modifiedFuelPayMode = req.body.modifiedFuelPayMode;
        FuelPayModeModel.findOneAndUpdate({ fuelPayModeId: fuelPayModeId, empId: employeeId}, 
            { ...modifiedFuelPayMode }, { new: true }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });

    app.get('/getAllFuelPayMode', (req, res) => {
        FuelPayModeModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteFuelPayMode', (req, res) => {
        const fuelPayModeId = req.body.fuelPayModeId;
        FuelPayModeModel.findOneAndDelete({ fuelPayModeId: fuelPayModeId }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    })
    return app;
}

module.exports = fuelPayModeRouter;