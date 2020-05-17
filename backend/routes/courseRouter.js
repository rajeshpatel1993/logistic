const CourseModel = require('../models/courseModel');

const courseRouter = (app) => {
    app.post('/addCourse', (req, res) => {
        const course = new CourseModel(req.body);
        course.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllCourse', (req, res) => {
        CourseModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteCourse', (req, res) => {
        const courseId = req.body.courseId;
        EmployeeModel.findOneAndDelete({ courseId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })
}

module.exports = courseRouter;