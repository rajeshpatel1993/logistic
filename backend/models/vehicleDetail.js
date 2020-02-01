const mongoose = require('mongoose');

const vehicleDetailSchema = new mongoose.Schema ({
    vehicleDetailsId: {
        type: Number
    },
    vehicleDetails:{
        type:String
    },
    vehicleTypeId:
    {
        type: String
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


const VehicleDetail = mongoose.model("VehicleDetail", vehicleDetailSchema, 'vehicleDetails');
exports.VehicleDetail = VehicleDetail;