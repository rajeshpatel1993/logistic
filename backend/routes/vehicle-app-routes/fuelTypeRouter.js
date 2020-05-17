const fuelTypeModel = require('../models/fuelTypeModel');
const uuid = require('uuid/v4');

const fuelTypeRouter = (app) => {
    app.post('/addFuelType', (req, res) => {
        const fuelTypeList = req.body.fuelTypeList;
        const withId = fuelTypeList.map((fuelType) => ({ fuelTypeId: uuid, fuelType}))
        FuelTypeModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getFuelTypeList', (req, res) => {
        FuelTypeModel.find({}, (err,resource) => {
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
     * @param fuelTypeId String
     * FuelType Id needs to be passed in request body for deleting
     */
app.post('/deleteFuelType', (req, res) => {
    const fuelTypeId = req.body.fuelTypeId;
    FuelTypeModel.findOneAndDelete({ fuelTypeID: fuelTypeId }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
})

app.post('/updateFuelType', (req, res) => {
    const fuelTypeID = req.body.fuelTypeId;
    const modifiedFuelType = req.body.fuelType;
    FuelTypeModel.findOneAndUpdate({ fuelTypeId: fuelTypeID }, { ...modifiedFuelType }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
});

module.exports = fuelTypeRouter;