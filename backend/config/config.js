// config.js
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || ''

    },
    db: {
        mongo_uri: process.env.MONGO_URI,
        db_username: process.env.DB_USERNAME,
        db_password: process.env.DB_PASSWORD
    },
    aws:{
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY,

    }

};

const prod = {

    app: {
        port: parseInt(process.env.PROD_APP_PORT) || ''
    },
    db: {
        mongo_uri: process.env.MONGO_URI,
        db_username: process.env.DB_USERNAME,
        db_password: process.env.DB_PASSWORD
    },
    aws:{
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY,

    }
}

const config = {
    dev,
    prod
};

module.exports = config[env];
