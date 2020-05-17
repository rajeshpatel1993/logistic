const insuranceModel = require('../models/insuranceModel');
const uuid = require('uuid/v4');

const insuranceRouter = (app) => {
    app.post('/addInsurance', (req, res) => {
        const insuranceList = req.body.insuranceList;
        const withId = insuranceList.map((insurance) => ({ insuranceId: uuid, insurance }))
        InsuranceModel.insertMany(withId, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getInsuranceList', (req, res) => {
        InsuranceModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
}

/**
     * @param insuranceId String
     * Insurance Id needs to be passed in request body for deleting
     */
app.post('/deleteInsurance', (req, res) => {
    const insuranceId = req.body.insuranceId;
    InsuranceModel.findOneAndDelete({ insuranceID: insuranceId }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
})

app.post('/updateInsurance', (req, res) => {
    const insuranceId = req.body.insuranceId;
    const modifiedInsurance = req.body.insurance;
    InsuranceModel.findOneAndUpdate({ insuranceID: insuranceId }, { ...modifiedInsurance }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
});

module.exports = insuranceRouter;