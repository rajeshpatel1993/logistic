const ServiceRemainderModel = require('../models/serviceRemainderModel');

const serviceRemainderRouter = (app) => {
    app.post('/addServiceRemainder', (req, res) => {
        const serviceRemainder = new ServiceRemainderModel(req.body);
        serviceRemainder.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.post('/editServiceRemainder', (req, res) => {
        const serviceRemainderId = req.body.serviceRemainderId;
        const employeeId = req.body.employeeId;
        const modifiedServiceRemainder = req.body.modifiedServiceRemainder;
        ServiceRemainderModel.findOneAndUpdate({ serviceRemainderId: serviceRemainderId, empId: employeeId}, 
            { ...modifiedServiceRemainder }, { new: true }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    });

    app.get('/getServiceRemainderByVehicleType', (req, res) => {
        const vehicleTypeId = req.body.vehicleTypeID;
        ServiceRemainderModel.find({ vehicleTypeID: vehicleTypeId }, (err, resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }   
        })
    });
    
    app.get('/getAllServiceRemainder', (req, res) => {
        ServiceRemainderModel.find({}, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });


    app.post('/deleteServiceRemainder', (req, res) => {
        const serviceRemainderId = req.body.serviceRemainderId;
        ServiceRemainderModel.findOneAndDelete({ serviceRemainderId: serviceRemainderId }, (err, resource) => {
                if(err) {
                    res.send(err).status(501);
                } else {
                    res.json(resource).status(200);
                }   
        })
    })
    return app;
}

module.exports = serviceRemainderRouter;