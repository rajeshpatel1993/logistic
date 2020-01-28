const mongoose = require('mongoose');

const workLocationSchema = new mongoose.Schema ({
    workLocationId: {
        type: String
    },
    workLocation:{
        type:String
    },
    workLocationCode:{
        type:String
    },
    creatorId: {
        type: String
    },
    organizationId: {
        type: String
    }
   


});


const WorkLocation = mongoose.model("WorkLocation", workLocationSchema, 'worklocation');
exports.WorkLocation = WorkLocation;