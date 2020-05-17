const powerToolsModel = require('../models/powerToolsModel');
const uuid = require('uuid/v4');

const powerToolsRouter = (app) => {
    app.post('/addPowerTools', (req, res) => {
        const powerToolsList = req.body.powerToolsList;
        const withId = powerToolsList.map((powerTools) => ({ powerToolsId: uuid, powerTools }))
        PowerToolsModel.insertMany(withId, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getPowerToolsList', (req, res) => {
        PowerToolsModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
}

app.get('/getPowerToolsByVehicleType', (req, res) => {
    const vehicleTypeID = req.body.vehicleTypeId;
    CompensationModel.find({ vehicleTypeId: vehicleTypeID }, (err, resource) => {
        if (err) {
            res.send(err).status(501);
        } else {
            res.json(resource).status(200);
        }
    })
});

/**
     * @param powerToolsId String
     * PowerTools Id needs to be passed in request body for deleting
     */
app.post('/deletePowerTools', (req, res) => {
    const powerToolsId = req.body.powerToolsId;
    PowerToolsModel.findOneAndDelete({ powerToolsID: powerToolsId }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
})

app.post('/updatePowerTools', (req, res) => {
    const powerToolsId = req.body.powerToolsId;
    const modifiedPowerTools = req.body.powerTools;
    PowerToolsModel.findOneAndUpdate({ powerToolsID: powerToolsId }, { ...modifiedPowerTools }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
});

module.exports = powerToolsRouter;