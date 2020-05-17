const brandModel = require('../models/brandModel');
const uuid = require('uuid/v4');

const brandRouter = (app) => {
    app.post('/addBrand', (req, res) => {
        const brandList = req.body.brandList;
        const withId = brandList.map((brand) => ({ brandId: uuid, brand}))
        BrandModel.insertMany(withId, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        });
    });

    app.get('/getBrandList', (req, res) => {
        BrandModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });
}

/**
     * @param brandId String
     * Brand Id needs to be passed in request body for deleting
     */
app.post('/deleteBrand', (req, res) => {
    const brandId = req.body.brandId;
    BrandModel.findOneAndDelete({ brandID: brandId }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
})

app.post('/updateBrand', (req, res) => {
    const brandID = req.body.brandId;
    const modifiedBrand = req.body.brand;
    BrandModel.findOneAndUpdate({ brandId: brandID }, { ...modifiedBrand }, (err, response) => {
        if (err) {
            res.send(err).status(501);
        } else {
            console.log(response);
            res.send(response).status(200);
        }
    })
});

module.exports = brandRouter;