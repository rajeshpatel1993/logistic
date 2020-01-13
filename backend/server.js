//server.js
const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
// import {orderUpdate} from "./controllers/orderUpdate";
// const config = require('config');
//const AWS = require('aws-sdk');
const config = require("./config/config");

let db_uri = config["db"].mongo_uri;
let db_username = config["db"].db_username;
let db_password = config["db"].db_password;
let server_port = config["app"].port;
// console.log(host);

mongoose.connect(`mongodb+srv://${db_username}:${db_password}@${db_uri}`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('connected to Mongodb..'))
    .catch((err) => {
        console.log("unable to connect to the database: ",err);
        process.exit();
        throw err;
    });

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

const vehicleController = require("./controllers/vehicle");

const app = express();
app.use(cors());
app.use(helmet()); // better status code
app.use(morgan('tiny')); // logs reqs meta data in console
app.use(bodyParser.json({limit: '10mb', extended: true}));

app.use('/api/vehicles', vehicleController);



// console.log(`Your port is ${process.env.PORT}`);

app.listen(server_port, () => {
    console.log(`App listening on port ${server_port}!`)
});