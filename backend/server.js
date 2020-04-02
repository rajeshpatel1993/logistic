//server.js
const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require("./config/config");


require('./connection');
let server_port = config["app"].port;

// import {orderUpdate} from "./controllers/orderUpdate";
// const config = require('config');
//const AWS = require('aws-sdk');


const vehicleController = require("./controllers/vehicle");
const employeeController = require("./controllers/employee");
const projectController = require("./controllers/project");
const serviceController = require("./controllers/service");
const expenseController = require("./controllers/expense");
const reportController = require("./controllers/reports");
const organizationController= require("./controllers/organization");
const remainderController = require("./controllers/remainder");
const fuelController = require("./controllers/fuel");

const app = express();
app.use(cors());
app.use(helmet()); // better status code
app.use(morgan('tiny')); // logs reqs meta data in console
app.use(bodyParser.json({limit: '10mb', extended: true}));

app.use('/api/vehicles', vehicleController);
app.use('/api/employees', employeeController);
app.use('/api/project', projectController);
app.use('/api/service', serviceController);
app.use('/api/expenses', expenseController);
app.use('/api/reports', reportController);
app.use('/api/organization', organizationController);
app.use('/api/remainder', remainderController);
app.use('/api/fuel', fuelController);






// console.log(`Your port is ${process.env.PORT}`);

app.listen(server_port, () => {
    console.log(`App listening on port ${server_port}!`)
});