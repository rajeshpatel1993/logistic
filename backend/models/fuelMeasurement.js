const mongoose = require('mongoose');

const fuelMeasurementSchema = new mongoose.Schema ({
    fuelMeausrementId: {
        type: Number
    },
    fuelMeausrement:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }
   


});


const FuelMesaurement = mongoose.model("FuelMeasurement", fuelMeasurementSchema, 'fuelMeausrement');
exports.FuelMesaurement = FuelMesaurement;