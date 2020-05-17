const NationalityModel = require('../models/nationalityModel');
const uuid = require('uuid/v4');

const nationalityRouter = (app) => {
    app.post('/addNationality', (req, res) => {
        const nationalityList = req.body.nationalityList;
        const withId = nationalityList.map((nationality) => ({ nationalityId: uuid, nationality}))
        NationalityModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getNationalityList', (req, res) => {
        NationalityModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    return app;
}

module.exports = nationalityRouter;