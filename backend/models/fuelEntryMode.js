const mongoose = require('mongoose');

const fuelEntryModeSchema = new mongoose.Schema ({
    fuelEntryModeId:{
        type: String
    },
    fuelEntryMode: {
        type: String
    },
    creatorId:{
        type: String
    },
    organizationId:{
        type: String
    },
    name:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const fuelEntryMode = mongoose.model("fuelEntryMode", fuelEntryModeSchema, 'fuelEntryMode');
exports.fuelEntryMode = fuelEntryMode;