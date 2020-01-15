const mongoose = require('mongoose');

const vehicleTypeSchema = new mongoose.Schema ({
    vehicleTypeId: {
        type: Number
    },
    vehicleTypeCode:{
        type:String
    },
    createdDate:{
        type:String
    },
    creatorId: {
        type: Number
    },
    organizationId: {
        type: Number
    }
   


});


const VehicleType = mongoose.model("VehicleType", vehicleTypeSchema, 'vehicleType');
exports.VehicleType = VehicleType;