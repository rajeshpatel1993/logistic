const OrganizationModel = require('../models/organizatioModel');

const stateRouter = (app) => {
    app.post('/addOrganization', (req, res) => {
        var organization = new OrganizationModel(req.body);
        organization.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getOrganization', (req, res) => {
        const organizationId = req.query.organizationId.toString();
        OrganizationModel.findOne({ organizationId: organizationId }, (err, organization) =>  {
            if(err) {
                res.json({ message: 'No organization found'}).status(404);
            } else {
                res.json({ message: 'success', organization });
            }
        })
    })

    return app;
}

module.exports = stateRouter;