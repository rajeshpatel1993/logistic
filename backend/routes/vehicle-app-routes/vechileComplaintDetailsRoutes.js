const VechileComplaintDetailsModel = require('../models/vechileComplaintDetailsModel');

const vechileComplaintDetailsRouter = (app) => {
    app.post('/addVechileComplaintDetails', (req, res) => {
        var vechileComplaintDetails = new VechileComplaintDetailsModel(req.body);
        vechileComplaintDetails.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllVechileComplaintDetails', (req, res) => {
        VechileComplaintDetailsModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.get('/getVechileComplaintByVehicleType', (req, res) => {
        const vehicleTypeId = req.body.vehicleTypeID;
        ServiceRemainderModel.find({ vehicleTypeID: vehicleTypeId }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getVechileComplaintByEmployee', (req, res) => {
        const employeeID = req.body.empId;
        ServiceRemainderModel.find({ empId: employeeID }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    /**
     * @param vehicleComplaintId String
     * VechileComplaintDetails Id needs to be passed in request body for deleting
     */
    app.post('/deleteVechileComplaintDetails', (req, res) => {
        const vehicleComplaintId = req.body.vehicleComplaintId;
        VechileComplaintDetailsModel.findOneAndDelete({ vehicleComplaintId: vehicleComplaintId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateVechileComplaintDetails', (req, res) => {
        const vehicleComplaintId = req.body.vehicleComplaintId;
        const modifiedVechileComplaintDetails = req.body.vechileComplaintDetails;
        VechileComplaintDetailsModel.findOneAndUpdate({ vehicleComplaintId: vehicleComplaintId }, { ...modifiedVechileComplaintDetails }, (err, response) => {
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


module.exports = vechileComplaintDetailsRouter;