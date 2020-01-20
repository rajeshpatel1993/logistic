const mongoose = require('mongoose');

const fuelTypeSchema = new mongoose.Schema ({
    fuelTypeId: {
        type: Number
    },
    fuelTypeName:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const FuelType = mongoose.model("FuelType", fuelTypeSchema, 'fuelType');
exports.FuelType = FuelType;