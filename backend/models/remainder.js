const mongoose = require('mongoose');

const remainderSchema = new mongoose.Schema ({
    remainderType:{type: mongoose.Schema.Types.ObjectId, ref: 'remainderType'},
    remainderName: {type: String, required: true},
    subject: {type: String, required: true},
    expirationDate: {type: String, required: true},
    expirationTime: {type: String, required: true},
    remainderInterval: {type: String, required: true},
    emailList: {type: [String], required: true},
    ownerEmail: {type: String},
    template: {type: String},
    notes: {type: String},
    enabledisable: {type: String},
    afterexpiration: {type: String},
    fileId: {type: String},
    service_type:{type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType', default:null},
    imageUrl: {type: String},
    remindert:{
        type: Number,
        enum : [1,2],
        default: '1'
    },
    vehicleTypef:{
        type: String
    },
    vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},


    isDeleted: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const Remainder = mongoose.model("Remainder", remainderSchema, 'remainders');
exports.Remainder = Remainder;