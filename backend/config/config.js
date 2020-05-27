// config.js
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || '',
        mail: process.env.MAIL_ID,
        pwd: process.env.PASS,
        cron_to_email: process.env.CRON_TO_MAIL,
        send_grid_key: process.env.SEND_GRID_API_KEY,
        send_grid_verified_sender : process.env.SEND_GRID_VERIFIED_SENDER
    },
    db: {
        mongo_uri: process.env.MONGO_URI,
        db_username: process.env.DB_USERNAME,
        db_password: process.env.DB_PASSWORD
    },
    aws:{
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        s3_bucket: process.env.AWS_S3_BUCKET


    }

};

const prod = {

    app: {
        port: parseInt(process.env.PROD_APP_PORT) || '',
        mail: process.env.MAIL_ID,
        pwd: process.env.PASS,
        cron_to_email: process.env.CRON_TO_MAIL,
        send_grid_key: process.env.SEND_GRID_API_KEY,
        send_grid_verified_sender : process.env.SEND_GRID_VERIFIED_SENDER



    },
    db: {
        mongo_uri: process.env.MONGO_URI,
        db_username: process.env.DB_USERNAME,
        db_password: process.env.DB_PASSWORD
    },
    aws:{
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        s3_bucket: process.env.AWS_S3_BUCKET


    }
}

const config = {
    dev,
    prod
};

module.exports = config[env];
