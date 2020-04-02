const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema ({
    vehicle:{type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    expiration_date: {type: String, required: true},
    expiration_time: {type: String, required: true},
    amount: {type: String, required: true},
    odometer: {type: String, required: true},
    modeofpayment: {type: mongoose.Schema.Types.ObjectId, ref: 'fuelEntryMode'},
    cardno: {type: String},
    couponfrom: {type: String},
    couponto: {type: String},
    couponvalue: {type: String},
    type: {type: String, required:true},
    priceunit: {type: String, required: true},
    unit:{
        type: string
       
    },
    vendorname:{
        type: String
    },
    driver: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    
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