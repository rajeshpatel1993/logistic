const AssetModel = require('../models/assetModel');
const AssetCategoryModel = require('../models/assetCategoryModel');
const EmployeeModel = require('../models/employeeModel');

const assetRouter = (app) => {
    app.post('/addAsset', (req, res) => {
        console.log(req.body.asset);
        var asset = new AssetModel(req.body.asset);
        asset.save((err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAssetsByEmployee', (req, res) => {
        const employeeId = req.query.employeeId;
        AssetModel.find({ empId: employeeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    //TODO: Remove this below api
    app.post('/assignAssetToEmployee', (req, res) => {
        const employeeId = req.body.employeeId;
        const assetId = req.body.assetId;
        AssetModel.findOneAndUpdate({ assetId: assetId }, { empId: employeeId, updatedDate: new Date() }, { new: true }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.post('/unassignAssetToEmployee', (req, res) => {
        const assetId = req.body.assetId;
        //TODO: Update Assigned Date and Returned Data in seperate document
        AssetModel.findOneAndUpdate({ assetId: assetId }, { empId: null, updatedDate: new Date(), assignStatus: '2' }, { new: true }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });


    app.get('/getAllAssignedAssets', (req, res) => {
        AssetModel.aggregate([
            { "$match": { empId: { $ne: "" }, organizationId: req.query.organizationId } },
            {
                $lookup:
                {
                    from: "employees",
                    let: { empId: "$empId" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                    { $eq: ["$employeeID", "$$empId"] }
                            }
                        },
                        { $project: { _id: 0, employeeID: 1, employeeCode: 1, emailAddress: 1 } }
                    ],
                    as: "employeeDetails"
                }
            },
            { $unwind: "$employeeDetails" },
            {
                $lookup: {
                    from: "assetcategories",
                    let: { assetCat: "$assetCat" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                    { $eq: ["$assetCategoryId", "$$assetCat"] }
                            }
                        },
                        { $project: { _id: 0, assetCategoryId: 1, assetCategory: 1 } }
                    ],
                    as: "assetcategory"
                }
            },
            { "$unwind": "$assetcategory" }
        ]).exec((err, assets) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json({ message: 'success', assets: assets }).status(200);
            }
        })
    });

    app.get('/getUnassignedAssets', (req, res) => {
        AssetModel.aggregate([
            { "$match": { empId: null, organizationId: req.query.organizationId } },
            {
                $lookup: {
                    from: "assetcategories",
                    let: { assetCat: "$assetCat" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                    { $eq: ["$assetCategoryId", "$$assetCat"] }
                            }
                        },
                        { $project: { _id: 0, assetCategoryId: 1, assetCategory: 1 } }
                    ],
                    as: "assetcategory"
                }
            },
            { "$unwind": "$assetcategory" }
        ]).exec((err, assets) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json({ message: 'success', assets: assets }).status(200);
            }
        })
    })

    app.post('/deleteAsset', (req, res) => {
        const assetId = req.body.assetId;
        AssetModel.findOneAndDelete({ assetId: assetId }, (err, response) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateAsset', (req, res) => {
        const assetId = req.body.assetId;
        const modifiedAsset = req.body.updatedAsset;
        console.log('asset update', assetId);
        AssetModel.findOneAndUpdate({ assetId: assetId }, { ...modifiedAsset }, { new: true, useFindAndModify: false }, (err, response) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    });

    app.get('/getUnassignedAssets', (req, res) => {
        AssetModel.find({ empId: null }, (err, resorce) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.send(resource).status(200);
            }
        })
    })

    return app;
}


module.exports = assetRouter;


