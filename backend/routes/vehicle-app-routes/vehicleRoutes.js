
const VehicleModel = require('../models/vehicleModel');

const qr = require('qr-image');

// The grid-stream

var grid = require("gridfs-stream");

// The File-System module

var fs = require("fs");

var nodeMailer = require("nodemailer");

 

var bodyParser = require('body-parser');

const xoauth2 = require('xoauth2');

const mongoose = require('mongoose');

const path = require('path');

const ABSPATH = path.dirname(process.mainModule.filename); // Absolute path to our app directory

 

//8. Establish connection between Mongo and GridFS

grid.mongo = mongoose.mongo;
 



const vehicleRouter = (app) => {
    app.post('/addVehicle', (req, res) => {
        var vehicle = new VehicleModel(req.body);
        vehicle.save((err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    app.get('/getAllVehicles', (req, res) => {
        VehicleModel.find({}, (err,resource) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(resource);
                res.send(resource).status(200);
            }
        });
    });

    app.get('/getVehicleByEmployee', (req, res) => {
        const empID = req.body.employeeID;
        VehicleModel.find({ employeeID: employeeID }, (err, resource) => {
            if (err) {
                res.send(err).status(501);
            } else {
                res.json(resource).status(200);
            }
        })
    });

    /**
     * @param vehicleId String
     * Vehicle Id needs to be passed in request body for deleting
     */
    app.post('/deleteVehicle', (req, res) => {
        const vehicleId = req.body.vehicleId;
        VehicleModel.findOneAndDelete({ vehicleID: vehicleId }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    })

    app.post('/updateVehicle', (req, res) => {
        const vehicleId = req.body.vehicleId;
        const modifiedVehicle = req.body.vehicle;
        VehicleModel.findOneAndUpdate({ vehicleID: vehicleId }, { ...modifiedVehicle }, (err, response) => {
            if(err) {
                res.send(err).status(501);
            } else {
                console.log(response);
                res.send(response).status(200);
            }
        })
    });

    (No subject)
[Draft]
This message hasn't been sent.
Saved on: Fri 05/07/2019 4:05 PM
 
const VehicleModel = require('../models/vehicleModel');

const qr = require('qr-image');

// The grid-stream

var grid = require("gridfs-stream");

// The File-System module

var fs = require("fs");

 

//8. Establish connection between Mongo and GridFS

Grid.mongo = mongoose.mongo;

 

 

const vehicleRouter = (app) => {

    app.post('/addVehicle', (req, res) => {

        var vehicle = new VehicleModel(req.body);

        vehicle.save((err,resource) => {

            if(err) {

                res.send(err).status(501);

            } else {

                res.json(resource).status(200);

            }

        })

    });

 

    app.get('/getAllVehicles', (req, res) => {

        VehicleModel.find({}, (err,resource) => {

            if(err) {

                res.send(err).status(501);

            } else {

                console.log(resource);

                res.send(resource).status(200);

            }

        });

    });

 

    app.get('/getVehicleByEmployee', (req, res) => {

        const empID = req.body.employeeID;

        VehicleModel.find({ employeeID: employeeID }, (err, resource) => {

            if (err) {

                res.send(err).status(501);

            } else {

                res.json(resource).status(200);

            }

        })

    });

 

    /**

     * @param vehicleId String

     * Vehicle Id needs to be passed in request body for deleting

     */

    app.post('/deleteVehicle', (req, res) => {

        const vehicleId = req.body.vehicleId;

        VehicleModel.findOneAndDelete({ vehicleID: vehicleId }, (err, response) => {

            if(err) {

                res.send(err).status(501);

            } else {

                console.log(response);

                res.send(response).status(200);

            }

        })

    })

 

    app.post('/updateVehicle', (req, res) => {

        const vehicleId = req.body.vehicleId;

        const modifiedVehicle = req.body.vehicle;

        VehicleModel.findOneAndUpdate({ vehicleID: vehicleId }, { ...modifiedVehicle }, (err, response) => {

            if(err) {

                res.send(err).status(501);

            } else {

                console.log(response);

                res.send(response).status(200);

            }

        })

    });

 

 

    /* Generate QR Code ref https://newcodingera.com/generate-qr-code-images-using-nodejs/ */

    app.post('/qrcode', (req, res, next) => {

        // Get the text to generate QR code

        let qr_txt = req.body.qr_text;

 

        //let qr_txt = 'welcome to TMS';

 

        // Generate QR Code from text

        var qr_png = qr.imageSync(qr_txt, { type: 'png' })

        // Generate a random file name

        let qr_code_file_name = new Date().getTime() + '.png';

        fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {

            if (err) {

                console.log(err);

            }

 

        })

        // Send the link of generated QR code to the folder qr

        res.send({

            'qr_img': "qr/" + qr_code_file_name

        });

    });
 
 
     /* Send email using Node Mailer ref https://www.zeolearn.com/magazine/sending-and-receiving-emails-using-nodejs/ */

     /* Comment attachment and its variable , if dont want to send it */

    app.post('/send-email', function (req, res) {

    let transporter = nodeMailer.createTransport({

        host: 'smtp.gmail.com',

        service: 'gmail',

        port: 465,

        secure: true,

        auth: {

            type: 'OAuth2', //Authentication type

            user: 'mailerdigitechocean@gmail.com',

            clientId: '248981875446-foru2jjnrmge7h1je0afbjn17vbceuoe.apps.googleusercontent.com',

            clientSecret: '1zk1nJNdU8nktft_A9oI7aol',

            refreshToken: '1/cyhr2EzuE0Q9VNuqMgtBWV6lvOVWM7m9UvDOoyL-6TA2vrmASb7MNjYlYvAVx5rY',

            accessToken: 'ya29.Gls_B6McnOImrinNSNlIZSJ5Eak1z_48cwxmUlu7kEDenoUgdRGG1SCB8YIuXfKeSEQs2-xnev9LxgDbcjQcmz_2Y5hFCa5tDaiHcogMqXUMu1krQOjOHnATamXv'

 

            }

    });

    let mailOptions = {

        from: '"Mailer Digitechocean" <mailerdigitechocean@gmail.com>', // sender address

        to: req.body.to, // list of receivers

        subject: req.body.subject, // Subject line

        text: req.body.body, // plain text body

        html: '<b>Eamil From Digitechocean</b>', // html body,

        attachments: [

            {

                path: ABSPATH + '/images/Holiday_List.PNG'

            }

        ]

    };

 transporter.sendMail(mailOptions, function (e, info) {

            if (e) {

                console.log(e);

            }

            else {

                console.log(info);

            }

            console.log('Message %s sent: %s', info.messageId, info.response);

            transporter.close();

        });

 

 

    /*transporter.sendMail(mailOptions, (error, info) => {

        if (error) {

            return console.log(error);

        }

        console.log('Message %s sent: %s', info.messageId, info.response);

        res.render('index');

    }); */

   });

    return app;

 



}


module.exports = vehicleRouter;
