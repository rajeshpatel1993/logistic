const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const assignVechicleSchema = new mongoose.Schema ({
    assignVehicleID:{
        type:Number,
        index: { unique: true }
    },
    employeeID:{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    vehicleID: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    projects: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
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
    workLocationID: {type: mongoose.Schema.Types.ObjectId, ref: 'WorkLocation'},
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