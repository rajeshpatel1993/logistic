const EmailNotificationModel = require('../models/emailNotificationModel');

const emailNotificationRouter = (app) => {
    app.post('/addEmailNotification', (req, res) => {
        var emailNotification = new EmailNotificationModel(req.body);
        emailNotification.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getEmailNotificationsByEmployee', (req, res) => {
        const employeeId = req.query.employeeId;
        EmailNotificationModel.find({empId: employeeId}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/assignEmailNotificationToEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const emailNotificationId = req.body.emailNotificationId;
        EmailNotificationModel.findOneAndUpdate({emailNotificationId: emailNotificationId}, { empId: employeeId }, { new: true }, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/unassignEmailNotificationToEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const emailNotificationId = req.body.emailNotificationId;
        EmailNotificationModel.findOneAndUpdate({emailNotificationId: emailNotificationId, empId: employeeId}, { empId: null }, { new: true }, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });


    app.get('/getAllEmailNotifications', (req, res) => {
        EmailNotificationModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteEmailNotification', (req, res) => {
        const emailNotificationId = req.body.emailNotificationId;
        EmailNotificationModel.findOneAndDelete({ emailNotificationId: emailNotificationId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateEmailNotification', (req, res) => {
        const employeeId = req.body.emailNotificationId;
        const modifiedEmailNotification = req.body.updatedEmailNotification;
        EmailNotificationModel.findOneAndUpdate({ employeeID: employeeId }, { ...modifiedEmailNotification }, { new: true}, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    });

    return app;
}


module.exports = emailNotificationRouter;