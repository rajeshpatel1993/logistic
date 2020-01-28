const mongoose = require('mongoose');

const vehicleStatusSchema = new mongoose.Schema ({
    vehicleStatusId: {
        type: String
    },
    vehicleStatus:{
        type:String
    },
    createdDate:
    {
        type: String
    },
    creatorId:{
        type:String
    },
    organizationId: {
        type: Number
    }
});


const VehicleStatus = mongoose.model("VehicleStatus", vehicleStatusSchema, 'vehicleStatus');
exports.VehicleStatus = VehicleStatus;