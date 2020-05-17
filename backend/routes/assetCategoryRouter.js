const AssetCategoryModel = require('../models/assetCategoryModel');

const assetCategoryRouter = (app) => {
    app.post('/addAssetCategory', (req, res) => {
        const assetCategory = new AssetCategoryModel(req.body);
        country.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllAssetCategory', (req, res) => {
        AssetCategoryModel.find({ organizationId: req.query.organizationId }, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/deleteAssetCategory', (req, res) => {
        const assetCategoryId = req.body.countryId;
        EmployeeModel.findOneAndDelete({ assetCategoryId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    return app;
}

module.exports = assetCategoryRouter;