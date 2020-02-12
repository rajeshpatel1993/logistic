const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema ({
    vehicle_type:{
        type:String
    },
    vehicle_typeId:{
        type:String
    },
    vehicle_code: {
        type: String
    },
    vehicleDetailsId: {
        type: String
    },
    name: {
        type : String , unique : true, required : true      
    },
    yearofManufacturer: {
        type: String
    },
    brandId: {
        type: String
    },
    modelId: {
        type: String
    },
    color: {
        type: String
    },
    vehicleBill:{
        type: []
    },
    vehicleImage:{
        type: String
    },
    regNo: {
        type: String
    },
    engineNo :{
        type: String
    },
    chassisNo : {
        type: String
    },
    serialNo : {
        type: String
    },
    warrantyPeriod : {
        type: String
    },
    validity: {
        type : String
    },
    fuelTypeId: {
        type: String
    },
    fuelMeausrementId : {
        type: String
    },
    trackUsageId : {
        type: String
    },
    currentUser : {
        type: String
    },
    currentUserDL: {
        type: String
    },
    employeeID : {
        type: String
    },
    vehicleOwnershipId: {
        type: String
    },
    insuranceValid : {
        type: String
    },
    insuranceNo : {
        type: String
    },
    insuranceAmt : {
        type: String
    },
    insuranceCopy : {
        type: String
    },
    insuranceCompanyId : {
        type: String
    },
    roadTaxValid : {
        type: String
    },
    roadTaxNo : {
        type: String
    },
    roadTaxAmt : {
        type: String
    },
    roadTaxCopy : {
        type: String
    },
    projectTypeID : {
        type: String
    },
    projectID: {
        type: String
    },
    vehicleStatusId: {
        type: String
    },
    assignStatusId: {
        type: String
    },
    workLocationId: {
        type: String
    },
    qrCode: {
        type: String
    },
    creatorId : {
        type: String
    },
    createdDate : {
        type: String
    },
    updatedDate : {
        type: String
    },
    updateId: {
        type: String
    },
    updatedStatus: {
        type: String
    },
    organizationId : {
        type: String
    },
    purchase_date: {
        type : String
    },
    note : {
        type : String
    },
    isDeleted: {
        type: String,
        default: 0
    },
    bill_file_unique_id: {
        type: String
    },
    image_file_unique_id: {
        type: String
    },
    qrCode:{
        type: String
    },
    assignMentStatus: {
        type: Number,
        default: 0 
    }


}, { timestamps: true });


const Vehicle = mongoose.model("Vehicle", vehicleSchema, 'vehicle');
exports.Vehicle = Vehicle;