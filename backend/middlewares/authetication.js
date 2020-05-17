const jwt = require('jsonwebtoken');

const verifyUrl = (req, res, next) => {
    console.log(req.headers);
    const authtoken = req.headers['authorization'];
    console.log('Inside Authorization', authtoken);
    if(!authtoken || !authtoken.startsWith('Bearer ')) {
        console.log('Inside Test');
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
    const token = authtoken.split(' ')[1];
    if (token) {
        console.log('Token Present');
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

}

module.exports = verifyUrl;
