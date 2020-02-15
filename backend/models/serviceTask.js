const mongoose = require('mongoose');

const serviceTaskSchema = new mongoose.Schema ({
    vehicleType:{type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType'},
    vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    serviceType: {type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType'},
    odometer: {
        type: String
    },
    completion_date_time:{
        type: Date
    },
    start_date: Date,
    vendor:{
        type: String
    },
    reference:{
        type: String
    },
    description: {
        type: String
    },
    amount: {
        type: String
    },
    isDeleted: {
        type: Number,
        default: 0
    },
    attachments:[],
    images: [],
    employee:{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    comments: {
        type: String
    }
    
}, { timestamps: true });


const ServiceTask = mongoose.model("ServiceTask", serviceTaskSchema, 'servicetask');


exports.ServiceTask = ServiceTask;