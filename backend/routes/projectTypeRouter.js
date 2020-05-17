const projectTypeModel = require('../models/projectTypeModel');
const uuid = require('uuid/v4');

const projectTypeRouter = (app) => {
    app.post('/addProjectType', (req, res) => {
        const projectTypeList = req.body.projectTypeList;
        const withId = projectTypeList.map((projectType) => ({ projectTypeId: uuid, projectType}))
        ProjectTypeModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getProjectTypeList', (req, res) => {
        ProjectTypeModel.find({}, (err,resource) => {
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

module.exports = projectTypeRouter;