const genderModel = require('../models/genderModel');
const uuid = require('uuid/v4');

const genderRouter = (app) => {
    app.post('/addGender', (req, res) => {
        const genderList = req.body.genderList;
        const withId = genderList.map((gender) => ({ genderId: uuid, gender}))
        GenderModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getGenderList', (req, res) => {
        GenderModel.find({}, (err,resource) => {
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

module.exports = genderRouter;