const UserModel = require('../models/userModel');

const verifyRole = (req, res, next) => {
    const userId = req.decoded.userId;
    console.log('Inside Role', userId);
    UserModel.findOne({ userId }, (err, resource) => {
        if(err) {
            res.json({ messsage: 'User Not Found' }).status(401);
        } else {
            console.log(resource.userRole);
            if(resource.userRole === 'admin') {
                next();
            } else {
                res.json({ message: 'Action Forbidden' }).status(403);
            }
        }
    })
}

module.exports = verifyRole;
