const brandVersionModel = require('../models/brandVersionModel');
const uuid = require('uuid/v4');

const brandVersionRouter = (app) => {
    app.post('/addBrandModel', (req, res) => {
        const brandVersionList = req.body.brandVersionList;
        const withId = brandVersionList.map((brandVersion) => ({ brandVersionId: uuid, brandVersion }))
        BrandVersionModel.insertMany(withId, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getBrandModelList', (req, res) => {
        BrandVersionModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
}

/**
     * @param brandVersionId String
     * BrandVersion Id needs to be passed in request body for deleting
     */
app.post('/deleteBrandModel', (req, res) => {
    const brandVersionId = req.body.brandVersionId;
    BrandVersionModel.findOneAndDelete({ brandVersionID: brandVersionId }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
})

app.post('/updateBrandModel', (req, res) => {
    const brandVersionId = req.body.brandVersionId;
    const modifiedBrand = req.body.brandVersion;
    BrandModel.findOneAndUpdate({ brandVersionID: brandVersionId }, { ...modifiedBrand }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
});

module.exports = brandVersionRouter;