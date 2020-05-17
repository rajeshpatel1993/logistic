const fuelMeasurementModel = require('../models/fuelMeasurementModel');
const uuid = require('uuid/v4');

const fuelMeasurementRouter = (app) => {
    app.post('/addFuelMeasurement', (req, res) => {
        const fuelMeasurementList = req.body.fuelMeasurementList;
        const withId = fuelMeasurementList.map((fuelMeasurement) => ({ fuelMeasurementId: uuid, fuelMeasurement}))
        FuelMeasurementModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getFuelMeasurementList', (req, res) => {
        FuelMeasurementModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
}

/**
     * @param fuelMeasurementId String
     * FuelMeasurement Id needs to be passed in request body for deleting
     */
app.post('/deleteFuelMeasurement', (req, res) => {
    const fuelMeasurementId = req.body.fuelMeasurementId;
    FuelMeasurementModel.findOneAndDelete({ fuelMeasurementID: fuelMeasurementId }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
})

app.post('/updateFuelMeasurement', (req, res) => {
    const fuelMeasurementID = req.body.fuelMeasurementId;
    const modifiedFuelMeasurement = req.body.fuelMeasurement;
    FuelMeasurementModel.findOneAndUpdate({ fuelMeasurementId: fuelMeasurementID }, { ...modifiedFuelMeasurement }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
});

module.exports = fuelMeasurementRouter;