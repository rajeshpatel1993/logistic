const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema ({
    vehicle:{type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    vehicleForSearch: {type: Object, required: true},
    // expiration_date: {type: String, required: true},
    // expiration_time: {type: String, required: true},
    amount: {type: String, required: true},
    odometer: {type: String},
    modeofpayment: {type: mongoose.Schema.Types.ObjectId, ref: 'fuelEntryMode'},
    fuelType: {type: mongoose.Schema.Types.ObjectId, ref: 'FuelType'},
    cardno: {type: String},
    couponfrom: {type: String},
    couponto: {type: String},
    couponvalue: {type: String},
    // type: {type: String, required:true},
    priceunit: {type: String, required: true},
    image_file_unique_id: {type: String},
    bill_file_unique_id: {type: String},
    imageUrl: {type: String},
    billUrl: {type: []},
    unit:{
        type: String
       
    },
    vendorname:{
        type: String
    },
    comment:{
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




const FuelEntry = mongoose.model("FuelEntry", fuelSchema, 'fuelEntry');
exports.FuelEntry = FuelEntry;