const mongoose = require('mongoose');

const assignVechicleHistorySchema = new mongoose.Schema ({
    employee:{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    projects: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    projectsType: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectType'},
    workLocations: {type: mongoose.Schema.Types.ObjectId, ref: 'WorkLocation'},
    fuelLimit: {
        type: String
    },
    assignmentStartDate:{
        type: Date
    },
    files: [],
    assignmentEndDate:{
        type: Date
    },
    driving_license_valid:{
        type: Date
    },
    note: {
        type: String
    }, 
    isDeleted: {
        type: Number,
        default: 0
    }

}, { timestamps: true });


const AssignVehicleHistory = mongoose.model("AssignVehicleHistory", assignVechicleHistorySchema, 'assignVehicleHistory');


exports.AssignVehicleHistory = AssignVehicleHistory;