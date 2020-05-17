const VehicleExpenseHistoryModel = require('../models/vehicleExpenseHistoryModel');

const vehicleExpenseHistoryRouter = (app) => {
    app.post('/addVehicleExpenseHistory', (req, res) => {
        var vehicleExpenseHistory = new VehicleExpenseHistoryModel(req.body);
        vehicleExpenseHistory.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllVehicleExpenseHistory', (req, res) => {
        VehicleExpenseHistoryModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.get('/getVehicleExpenseByVehicleType', (req, res) => {
        const vehicleTypeId = req.body.vehicleTypeID;
        VehicleExpenseHistoryModel.find({ vehicleTypeID: vehicleTypeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getVechileExpenseByEmployee', (req, res) => {
        const employeeID = req.body.empId;
        VehicleExpenseHistoryModel.find({ empId: employeeID }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });


    /**
     * @param vehicleExpenseHistoryId String
     * expenseID needs to be passed in request body for deleting
     */
    app.post('/deleteVehicleExpenseHistory', (req, res) => {
        const expenseId = req.body.expenseId;
        VehicleExpenseHistoryModel.findOneAndDelete({ expenseID: expenseId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateVehicleExpenseHistory', (req, res) => {
        const expenseId = req.body.expenseId;
        const modifiedVehicleExpenseHistory = req.body.vehicleExpenseHistory;
        VehicleExpenseHistoryModel.findOneAndUpdate({ expenseID: expenseId }, { ...modifiedVehicleExpenseHistory }, (err, response) => {
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


module.exports = vehicleExpenseHistoryRouter;