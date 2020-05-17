const OrganizationModel = require('../models/organizatioModel');
const verifyOrganization = (req, res, next) => {
    const organizationId = req.query.organizationId;
    console.log('Inside Organization', organizationId);
    OrganizationModel.find({ organizationId }, (err, reource) => {
        if(err) {
            res.json({ message: 'Not Authorized'}).status(403);
        } else {
            next();
        }
    })
}

module.exports = verifyOrganization;
