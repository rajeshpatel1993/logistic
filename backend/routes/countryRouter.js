const CountryModel = require('../models/countryModel');

const countryRouter = (app) => {
    app.post('/addCountry', (req, res) => {
        const country = new CountryModel(req.body);
        country.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllCountries', (req, res) => {
        CountryModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteCountry', (req, res) => {
        const countryId = req.body.countryId;
        EmployeeModel.findOneAndDelete({ countryId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    return app;
}

module.exports = countryRouter;