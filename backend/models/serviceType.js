const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema ({
    taskid: {
        type: String
    },
    serviceTaskName:{
        type:String
    },
    desc: {
        type: String

    }


});


const ServiceType = mongoose.model("ServiceType", serviceTypeSchema, 'servicetype');
exports.ServiceType = ServiceType;