const express = require("express");
const router = express.Router();
const {Vehicle} = require("../models/vehicle");
const {VehicleType} = require("../models/vechileType");
const {VehicleDetail} = require("../models/vehicleDetail");
const {Model} = require("../models/models");
const {Brand} = require("../models/brands");
const {Color} = require("../models/colors");
const {FuelType} = require("../models/fuelType");
const {FuelMesaurement} = require("../models/fuelMeasurement");
const {Agent} = require("../models/insuranceAgent");
const {File} = require("../models/files");
const {VehicleStatus} = require("../models/vehicleStatus");
const {OwnerShip} = require("../models/ownership");
const {WorkLocation} = require("../models/workLocation");

const { upload } = require("../utils/upload_file_to_s3");
const multer = require('multer');

const paginate = require('jw-paginate');


//upload files
router.post("/fileupload",  multer({ dest: 'temp/', limits: { fieldSize: 8 * 1024 * 1024 } }).array(
    'files', 10
  ),upload, async(req,res) => {
    let {fileId, typeoffile} = req.body;
    try{
        let file_instance = new File({"fileId":fileId,"filetype" : typeoffile, "s3Urls":req.uploadedFiles});
        let saveFileData = await file_instance.save();

        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = saveFileData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }

});

router.post("/add", async (req, res)=> {
// let {asset} = req.body;
try{

     let {vehicleTypef, vehicledetails, vehicleCode,vehicleName,regNo, model, brand, color, manufacture_year, engine_no, chasis_no, purchase_date, warranty_period, 
        fuel_type, fuelMeausrement, insurance_policy_no,insurance_amount,policy_expiry,insurance_agent,road_tax_no,road_tax_amount, road_tax_expiry, 
          bill_file_unique_id, image_file_unique_id, ownership_status, note, vehicleStatus, workLocation} = req.body;

     let vehicleImage = await File.find({fileId:image_file_unique_id }).select("s3Urls");
     let imgUrl = vehicleImage[0].s3Urls[0];
    
        const vehicle_instance = new Vehicle({vehicle_type:vehicleTypef.name, vehicle_typeId: vehicleTypef.id, vehicle_code : vehicleCode , vehicleDetailsId: vehicledetails.id, name : vehicleName , 
            yearofManufacturer : manufacture_year, model : model.id, color : color.name, vehicleImage:imgUrl, regNo: regNo, engineNo : engine_no , chassisNo : chasis_no,
            warrantyPeriod : warranty_period,  fuelTypeId: fuel_type.id, fuelMeausrementId: fuelMeausrement.id, vehicleOwnershipId: ownership_status.id,
            insuranceValid: policy_expiry, insuranceNo : insurance_policy_no, insuranceAmt:insurance_amount, purchase_date: purchase_date,note: note,
            insuranceAgent: insurance_agent.id, roadTaxValid : road_tax_expiry, roadTaxNo : road_tax_no, roadTaxAmt : road_tax_amount, make: brand.id,
            vehicleStatusId: vehicleStatus, workLocationId : workLocation.id
        
        })
    let saveData = await vehicle_instance.save();
    if(saveData){
        res.status(200).json({"msg":"saved successfully"});
    }
    
 
    // res.status(200).json(req.body);
}catch(err){
    console.log(err);
}


});

router.get("/filtervehicle", async(req,res)=>{
   
    let matchCondition = [];
    let vehicleType = req.query.vehicleType;
    let vehicleDetail = req.query.vehicleDetail;
    let vehicleReg = req.query.vehicleReg;

    if(vehicleType){
        matchCondition.push({vehicle_typeId : vehicleType });
    }
    if(vehicleDetail){
        matchCondition.push({vehicleDetailsId : vehicleDetail});
    }
    if(vehicleReg){
        matchCondition.push({regNo : vehicleReg});
    }
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    try {
       

        const nooitemsAggregate = await Vehicle.aggregate([
            {$match: {$and: matchCondition}},
            {$count : "noofitems"}
        ]);
        const nooitems = nooitemsAggregate[0].noofitems;
        const pager = paginate(nooitems, page,resPerPage);


       let vehicleData = await Vehicle.aggregate([ 
        { $match: { $and: matchCondition } },
   
        {
            $lookup: {
                from: "vehicleDetails", // collection to join
                let: { "vechDetId": "$vehicleDetailsId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleDetailsId", "$$vechDetId"] }}},
                    { "$project": { "vehicleDetails": 1, "_id": 0 }}
                ],
                as: "vehicleDetailsArray"// output array field
            }
        }, {
            $lookup: {
                from: "vehicleStatus", // from collection name
                let: { "vechStatusId": "$vehicleStatusId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleStatusId", "$$vechStatusId"] }}},
                    { "$project": { "vehicleStatus": 1, "_id": 0 }}
                ],
                as: "vehicleStatusArray"
            }
        },
        {
            $lookup: {
                from: "worklocation", // from collection name
                let: { "worklocid": "$workLocationId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$workLocationId", "$$worklocid"] }}},
                    { "$project": { "workLocation": 1, "_id": 0 }}
                ],
                as: "workLocationArray"
            }
        },
      
        {
            $skip: skipd
        },
        {
            $limit:resPerPage
        }
       
    
    ]);

        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = vehicleData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});


router.get("/types", async(req,res)=>{
    try{
        let vehicleTypeData = await VehicleType.find().select("vehicleTypeId , vehicleType , vehicleTypeCode");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/workLocations", async(req,res)=>{
    try{
        let workLocationData = await WorkLocation.find().select("workLocationId  workLocation -_id");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = workLocationData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});



router.get("/vehicleStatus", async(req,res)=>{
    try{
        let vehicleStatusData = await VehicleStatus.find().select("vehicleStatusId  vehicleStatus -_id");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleStatusData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/models", async(req,res)=>{
    try{
        let modelsData = await Model.find().select("modelId , model , brandId");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = modelsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/agents", async(req,res)=>{
    try{
        let agentsData = await Agent.find().select("insuranceCompanyId  , insuranceCompanyName");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = agentsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/ownerships", async(req,res)=>{
    try{
        let ownershipsData = await OwnerShip.find().select("vehicleOwnershipId  , vehicleOwnership");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = ownershipsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/brands", async(req,res)=>{
    try{
        let brandsData = await Brand.find().select("brandId , brand");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = brandsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/colors", async(req,res)=>{
    try{
        let colorsData = await Color.find().select("colorId , name");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = colorsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/fueltype", async(req,res)=>{
    try{
        let fuelTypeData = await FuelType.find().select("fuelTypeId , fuelTypeName");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = fuelTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/fuelMeasurement", async(req,res)=>{
    try{
        let fuelMesaurementData = await FuelMesaurement.find().select("fuelMeausrementId , fuelMeausrement");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = fuelMesaurementData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});







router.get("/details", async(req,res)=>{
    try{
        let vehicleDetailsData = await VehicleDetail.find().select("vehicleDetailsId , vehicleDetails");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleDetailsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/regnos", async(req,res)=>{
    try{
        let regData = await Vehicle.find().distinct('regNo');
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = regData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/",async(req,res) => {
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    try {
       

        const nooitems = await Vehicle.count();

         // get pager object for specified page
         const pager = paginate(nooitems, page,resPerPage);

       let vehicleData = await Vehicle.aggregate([ {
            $lookup: {
                from: "vehicleDetails", // collection to join
                let: { "vechDetId": "$vehicleDetailsId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleDetailsId", "$$vechDetId"] }}},
                    { "$project": { "vehicleDetails": 1, "_id": 0 }}
                ],
                as: "vehicleDetailsArray"// output array field
            }
        }, {
            $lookup: {
                from: "vehicleStatus", // from collection name
                let: { "vechStatusId": "$vehicleStatusId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleStatusId", "$$vechStatusId"] }}},
                    { "$project": { "vehicleStatus": 1, "_id": 0 }}
                ],
                as: "vehicleStatusArray"
            }
        },
        {
            $lookup: {
                from: "worklocation", // from collection name
                let: { "worklocid": "$workLocationId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$workLocationId", "$$worklocid"] }}},
                    { "$project": { "workLocation": 1, "_id": 0 }}
                ],
                as: "workLocationArray"
            }
        },
        {
            $skip: skipd
        },
        {
            $limit:resPerPage
        }
       
    
    ]);

        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = vehicleData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;