//const ProjectModel = require('../models/projectModel');
const uuid = require('uuid/v4');

const projectRouter = (app) => {
    /* app.post('/addProject', (req, res) => {
        const projectList = req.body.projectList;
        const withId = projectList.map((project) => ({ projectId: uuid, project}))
        ProjectModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getProjectList', (req, res) => {
        ProjectModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    }); */

    return app;
}

module.exports = projectRouter;