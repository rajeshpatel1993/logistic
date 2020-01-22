const mongoose = require('mongoose');

const ownershipSchema = new mongoose.Schema ({
    vehicleOwnershipId: {
        type: Number
    },
    vehicleOwnership:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const OwnerShip = mongoose.model("OwnerShip", ownershipSchema, 'vehicleOwnership');
exports.OwnerShip = OwnerShip;