const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const assignVechicleSchema = new mongoose.Schema ({
    assignVehicleID:{
        type:Number,
        // index: { unique: true }
    },
    employee:{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    projects: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    projectsType: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectType'},

    // vehicle_code: {
    //     type: String
    // },
    // vehicleImage: {
    //     type: String
    // },
    // vehicleStatusID: {
    //     type: String
    // },
    // vechileTypeID: {
    //     type: String
    // },
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
    // ,
    // statusId :{
    //     type: String,
    //     default: 1,
    // },
    // creatorId : {
    //     type: String
    // },
    // organizationId : {
    //     type: String
    // }

}, { timestamps: true });

assignVechicleSchema.plugin(AutoIncrement, {inc_field: 'assignVehicleID'});

const AssignVehicle = mongoose.model("AssignVehicle", assignVechicleSchema, 'assignVehicle');


exports.AssignVehicle = AssignVehicle;