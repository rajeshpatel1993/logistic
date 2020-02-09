const mongoose = require('mongoose');

const vehicleIssueStatusSchema = new mongoose.Schema ({
    vehicleIssueStatusId: {
        type: String
    },
    vehicleIssueStatus:{
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


const VehicleIssueStatus = mongoose.model("VehicleIssueStatus", vehicleIssueStatusSchema, 'vehicleIssueStatus');
exports.VehicleIssueStatus = VehicleIssueStatus;