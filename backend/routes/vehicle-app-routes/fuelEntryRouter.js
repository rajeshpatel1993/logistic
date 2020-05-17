const FuelEntryModel = require('../models/fuelEntryModel');

const fuelEntryRouter = (app) => {
    app.post('/addFuelEntry', (req, res) => {
        const fuelEntry = new FuelEntryModel(req.body);
        fuelEntry.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editFuelEntry', (req, res) => {
        const fuelEntryId = req.body.fuelEntryId;
        const employeeId = req.body.employeeId;
        const modifiedFuelEntry = req.body.modifiedFuelEntry;
        FuelEntryModel.findOneAndUpdate({ fuelEntryId: fuelEntryId, empId: employeeId}, 
            { ...modifiedFuelEntry }, { new: true }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });

    app.get('/getFuelEntryByEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        FuelEntryModel.find({ empId: employeeId }, (err, resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }   
        })
    });

    app.post('/deleteFuelEntry', (req, res) => {
        const fuelEntryId = req.body.fuelEntryId;
        FuelEntryModel.findOneAndDelete({ fuelEntryId: fuelEntryId }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    })
    return app;
}

module.exports = fuelEntryRouter;