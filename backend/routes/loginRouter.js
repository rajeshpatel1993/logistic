const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const loginRouter = (app) => {
    app.post('/checkUser', function (req, res) {
        var userName = req.body.username;
        var passWord = req.body.password;
        console.log(userName);
        UserModel.findOne({ 'username': userName }, function (err, resource) {
            if (err) {
                res.json({ success: false, message: 'Authentication failed.' });
            }
            else {
                if (resource) {
                    if (resource.password === passWord) {
                        console.log("secret ==>" + process.env.SECRET_KEY);
                        var token = jwt.sign({ userId: resource.userId, organizationId: resource.organizationId }, process.env.SECRET_KEY, {
                            expiresIn: '1d' // expires in 24 hours
                        });
                        const modifiedResource = Object.assign({}, resource._doc);
                        delete modifiedResource.password;
                        console.log(modifiedResource);
                        res.json({
                            success: true,
                            message: 'Logged In Successfully',
                            token: token,
                            loggedUserDet: modifiedResource
                        });
                    } else {
                        res.json({ success: false, message: 'Wrong Password' });
                    }
                }
                else {
                    res.json({ success: false, message: 'Authentication failed.' });
                }
            }
        });
    });

    app.get('/getuser', (req, res) => {
        const userId = req.query.userId;
        UserModel.findOne({ userId }, (err, user) => {
            if(err) {
                res.json({ success: 'false', message: 'User Id Not Found'}).status(404);
            } else {
                res.json({ success: true, user }).status(200);
            }
        })
    })
    return app;
}

module.exports = loginRouter;