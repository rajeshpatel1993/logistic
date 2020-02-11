const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const qrCode = require('qrcode')

const {Vehicle} = require("../models/vehicle");
const {AssignVehicle} = require("../models/assignVehicle");

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


router.post("/updateVehicle", async (req, res)=> {
    // let {asset} = req.body;
    try{

        console.log(req.body);
        let vehicle_types;
        let vehicle_typeId;
        let vehicleDetailsId;

        let updateField = {};



         let {vehicleTypef, vehicledetails, vehicleCode,vehicleName,regNo, model, brand, color, manufacture_year, engine_no, chasis_no, purchase_date, warranty_period, 
            fuel_type, fuelMeausrement, insurance_policy_no,insurance_amount,policy_expiry,insurance_agent,road_tax_no,road_tax_amount, road_tax_expiry, 
              bill_file_unique_id, image_file_unique_id, ownership_status, note, vehicleStatus, workLocation, vehicleId} = req.body;

            
              updateField["vehicleStatusId"] = vehicleStatus;
              updateField["vehicle_code"] = vehicleCode;
              updateField["name"] = vehicleName;
              updateField["regNo"] = regNo;
              updateField["yearofManufacturer"] = manufacture_year;
              updateField["engineNo"] = engine_no;
              updateField["chassisNo"] = chasis_no;
              updateField["purchase_date"] = purchase_date;
              updateField["warrantyPeriod"] = warranty_period;
              updateField["insuranceNo"] = insurance_policy_no;
              updateField["insuranceAmt"] = insurance_amount;
              updateField["insuranceValid"] = policy_expiry;
              updateField["roadTaxNo"] = road_tax_no;
              updateField["roadTaxAmt"] = road_tax_amount;
              updateField["roadTaxValid"] = road_tax_expiry;
              updateField["bill_file_unique_id"] = bill_file_unique_id;
              updateField["image_file_unique_id"] = image_file_unique_id;
              updateField["note"] = note;


            if(typeof vehicleTypef != "string"){
                updateField["vehicle_type"] = vehicleTypef.name;
                updateField["vehicle_typeId"] =  vehicleTypef.id;

            }else{
                updateField["vehicle_type"] = vehicleTypef.name;

            }


            if(typeof vehicledetails != "string"){
                updateField["vehicleDetailsId"] = vehicledetails.id;

            }

            if(typeof model != "string"){
                updateField["modelId"] = model.id;

            }

            if(typeof brand != "string"){
                updateField["brandId"] = brand.id;
            }

            if(typeof color != "string"){
                updateField["color"] = color.name;
            }

            if(typeof fuel_type != "string"){
                updateField["fuelTypeId"] = fuel_type.id;
            }

            if(typeof fuelMeausrement != "string"){
                updateField["fuelMeausrementId"] = fuelMeausrement.id;
            }

            if(typeof insurance_agent != "string"){
                updateField["insuranceCompanyId"] = insurance_agent.id;
            }

            if(typeof ownership_status != "string"){
                updateField["vehicleOwnershipId"] = ownership_status.id;
            }

            if(typeof ownership_status != "string"){
                updateField["vehicleOwnershipId"] = ownership_status.id;
            }

            if(typeof workLocation != "string"){
                updateField["workLocationId"] = workLocation.id;
            }


            const filter = { _id: mongoose.Types.ObjectId(vehicleId) };
            const update = updateField;


            let doc = await Vehicle.findOneAndUpdate(filter, update, {
                new: true,
                upsert: true // Make this update into an upsert
              });

        
        if(doc){
            res.status(200).json({"msg":"saved successfully"});
        }

    }catch(err){
        console.log(err);
    }
    
    
});



router.post("/add-assign", async (req, res)=> {
    // let {asset} = req.body;
    try{

        // console.log(req.body);
    
       
        
        let filesurls = [];
        let {employee_name, assignment_start_date, assignment_end_date,work_location,project_type, project, fuel_limit_per_month, 
            driving_license_valid, note, file_unique_id, vehicle_id} = req.body;
    
        let vehicleFiles = await File.find({fileId:file_unique_id }).select("s3Urls");
        if(vehicleFiles){
            filesurls = vehicleFiles[0].s3Urls; 
        }
    
        const assign_vehicle_instance = new AssignVehicle(
        
        );

        const query = {"vehicle":vehicle_id};
        const query1 = {"_id":vehicle_id};
        
        const update =     {
            employee:employee_name.id, 
            vehicle: vehicle_id,
            workLocations: work_location.id,
            fuelLimit:fuel_limit_per_month,
            assignmentStartDate:assignment_start_date,
            assignmentEndDate: assignment_end_date,
            driving_license_valid,
            note,
            files:filesurls,
            projects:project.id

        };

        const update1 = {
            $set: { 'assignMentStatus': 1} ,

        };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        let saveData = await AssignVehicle.findOneAndUpdate(query, update, options);
        let updateAssignmentVehicle = await Vehicle.findOneAndUpdate(query1,update1);

        // let saveData = await assign_vehicle_instance.save();
        if(saveData){
            res.status(200).json({"msg":"saved successfully"});
        }
        
     
        // res.status(200).json(req.body);
    }catch(err){
        console.log(err);
    }
    
    
    });


router.post("/add", async (req, res)=> {
// let {asset} = req.body;
try{

    let imgUrl = "";
    let billUrls = "";
    let {vehicleTypef, vehicledetails, vehicleCode,vehicleName,regNo, model, brand, color, manufacture_year, engine_no, chasis_no, purchase_date, warranty_period, 
        fuel_type, fuelMeausrement, insurance_policy_no,insurance_amount,policy_expiry,insurance_agent,road_tax_no,road_tax_amount, road_tax_expiry, 
          bill_file_unique_id, image_file_unique_id, ownership_status, note, vehicleStatus, workLocation} = req.body;

     let vehicleImage = await File.find({fileId:image_file_unique_id }).select("s3Urls");
    //  console.log(vehicleImage)
     if(vehicleImage.length > 0){
        imgUrl = vehicleImage[0].s3Urls[0];
     }

     //Vehicle code,type, reg no or serial no, name
     let qrCodeString = `Vehicle code: ${vehicleCode}\n Vehicle type: ${vehicleTypef.name}\n Reg no: ${regNo}\n Name: ${vehicleName}`;
    let qrcodeURl = await qrCode.toDataURL(qrCodeString);
     
   
     let vehicleBills = await File.find({fileId:bill_file_unique_id }).select("s3Urls");

     if(vehicleBills.length > 0){
        billUrls = vehicleBills[0].s3Urls;
    }

        const vehicle_instance = new Vehicle({vehicle_type:vehicleTypef.name, vehicle_typeId: vehicleTypef.id, vehicle_code : vehicleCode , vehicleDetailsId: vehicledetails.id, name : vehicleName , 
            yearofManufacturer : manufacture_year, modelId : model.id, color : color.name, vehicleImage:imgUrl, regNo: regNo, engineNo : engine_no , chassisNo : chasis_no,
            warrantyPeriod : warranty_period,  fuelTypeId: fuel_type.id, fuelMeausrementId: fuelMeausrement.id, vehicleOwnershipId: ownership_status.id,
            insuranceValid: policy_expiry, insuranceNo : insurance_policy_no, insuranceAmt:insurance_amount, purchase_date: purchase_date,note: note,
            insuranceCompanyId: insurance_agent.id, roadTaxValid : road_tax_expiry, roadTaxNo : road_tax_no, roadTaxAmt : road_tax_amount, brandId: brand.id,
            vehicleStatusId: vehicleStatus, workLocationId : workLocation.id, vehicleBill: billUrls, bill_file_unique_id, image_file_unique_id
            ,qrCode:qrcodeURl
        
        });
    let saveData = await vehicle_instance.save();
    if(saveData){
        res.status(200).json({"msg":"saved successfully"});
    }
    
 
    // res.status(200).json(req.body);
}catch(err){
    console.log(err);
}


});




router.post("/deleteVehicle", async (req, res) => {
    try{

        let {id} = req.body;
        const filter = { _id: mongoose.Types.ObjectId(id) };
        const update = { isDeleted: 1 };
        let updateVehicle = await Vehicle.findOneAndUpdate(filter, update);
        res.status(200).json({"msg":"saved successfully"});
        // console.log(updateVehicle);

    }catch(error){
        console.log(error);
    }
});


router.get("/getvehicle/:id", async (req, res) => {
    const id = req.params.id; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const vehicle = await Vehicle.aggregate([{$match:filter},{
        
            $lookup: {
                from: "vehicleDetails", // collection to join
                let: { "vechDetId": "$vehicleDetailsId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleDetailsId", "$$vechDetId"] }}},
                    { "$project": { "vehicleDetails": 1, "_id": 0 }}
                ],
                as: "vehicleDetailsArray"// output array field
            }
        
    },
    {

        $lookup: {
            from: "model", // collection to join
            let: { "modelID": "$modelId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$modelId", "$$modelID"] }}},
                { "$project": { "model": 1, "_id": 0 }}
            ],
            as: "vehicleModels"// output array field
        }

    },

    {

        $lookup: {
            from: "brand", // collection to join
            let: { "brandID": "$brandId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$brandId", "$$brandID"] }}},
                { "$project": { "brand": 1, "_id": 0 }}
            ],
            as: "vehicleBrands"// output array field
        }

    },

    {

        $lookup: {
            from: "fuelType", // collection to join
            let: { "fuelTypeID": "$fuelTypeId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$fuelTypeId", "$$fuelTypeID"] }}},
                { "$project": { "fuelTypeName": 1, "_id": 0 }}
            ],
            as: "fuelTypes"// output array field
        }

    },

    {

        $lookup: {
            from: "fuelMeausrement", // collection to join
            let: { "fuelMeausrementID": "$fuelMeausrementId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$fuelMeausrementId", "$$fuelMeausrementID"] }}},
                { "$project": { "fuelMeausrement": 1, "_id": 0 }}
            ],
            as: "fuelMesaureMents"// output array field
        }

    },

    {

        $lookup: {
            from: "worklocation", // collection to join
            let: { "workLocationID": "$workLocationId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$workLocationId", "$$workLocationID"] }}},
                { "$project": { "workLocation": 1, "_id": 0 }}
            ],
            as: "workLocations"// output array field
        }

    },

    {

        $lookup: {
            from: "insuranceCompany", // collection to join
            let: { "insuranceCompanyID": "$insuranceCompanyId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$insuranceCompanyId", "$$insuranceCompanyID"] }}},
                { "$project": { "insuranceCompanyName": 1, "_id": 0 }}
            ],
            as: "insuranceAgents"// output array field
        }

    },

    {

        $lookup: {
            from: "vehicleOwnership", // collection to join
            let: { "vehicleOwnershipID": "$vehicleOwnershipId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$vehicleOwnershipId", "$$vehicleOwnershipID"] }}},
                { "$project": { "vehicleOwnership": 1, "_id": 0 }}
            ],
            as: "vehicleOwnerships"// output array field
        }

    },

    

    // {

    //     $lookup: {
    //         from: "vehicleStatus", // collection to join
    //         let: { "vehicleStatusID": "$vehicleStatusId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$vehicleStatusId", "$$vehicleStatusID"] }}},
    //             { "$project": { "vehicleStatus": 1, "_id": 0 }}
    //         ],
    //         as: "vehicleStatuses"// output array field
    //     }

    // }






]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = vehicle;
    res.status(200).json(responseData);
    


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
    let nooitems ;

    try {
       

        const nooitemsAggregate = await Vehicle.aggregate([
            {$match: {$and: matchCondition}},
            {$count : "noofitems"}
        ]);

        if(nooitemsAggregate.length > 0){
            nooitems = nooitemsAggregate[0].noofitems;
        }else{
            nooitems = 0;

        }
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
        let workLocationData = await WorkLocation.find().select("workLocationId  workLocation");
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


router.get("/vehicleStatusWithCount", async(req,res)=>{
    let statusArr = [];
    try{
        let vehicleStatusData = await VehicleStatus.find().select("vehicleStatusId  vehicleStatus -_id");
        for(let i=0;i<vehicleStatusData.length;i++){
            let vehStatus =  {};
            vehStatus["name"] = vehicleStatusData[i].vehicleStatus;
            let countofstatus = await Vehicle.find({"vehicleStatusId":vehicleStatusData[i].vehicleStatusId, isDeleted: "0"}).countDocuments();
            vehStatus["totalcount"] = countofstatus;
            statusArr.push(vehStatus);
        }
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = statusArr;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/vehicleAssignNotAssignCount", async(req,res)=>{
    let statusArr = [];
    let aggregate = [
        {"$group":{_id:"$assignMentStatus", count: {$sum:1}}}
    ];
    try{
        let vehicleData = await Vehicle.aggregate(aggregate);
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});




router.get("/models/:brandId", async(req,res)=>{
    try{
        let brandId = req.params.brandId;

        let modelsData = await Model.find({"brandId" : brandId}).select("modelId , model , brandId");
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

router.get("/fueltype/:fuelMeasureMentId", async(req,res)=>{
    try{
        let fuelMeasureMentId = req.params.fuelMeasureMentId;
        let fuelTypeData = await FuelType.find({"fuelMeasurementId":fuelMeasureMentId}).select("fuelTypeId , fuelTypeName");
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







router.get("/details/:vehicleType", async(req,res)=>{
    try{
        let vehicleType = req.params.vehicleType;
        let vehicleDetailsData = await VehicleDetail.find({"vehicleTypeId" : vehicleType}).select("vehicleDetailsId , vehicleDetails");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleDetailsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});





router.get("/last-vech-id/:vehicleTypeId", async (req, res) => {
    const vehicleTypeId = req.params.vehicleTypeId; //or use req.param('id')
    const filter = {$and: [{ vehicle_typeId: vehicleTypeId},{"isDeleted":"0"}] };
    const vehicle = await Vehicle.aggregate([{$match:filter}, { $project : { name : 1  } }]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = vehicle;
    res.status(200).json(responseData);
    


});


router.get("/vech-details/:vehicleTypeId", async (req, res) => {
    const vehicleTypeId = req.params.vehicleTypeId; //or use req.param('id')
    const filter = {$and: [{ vehicle_typeId: vehicleTypeId},{"isDeleted":"0"}] };
    const vehicle = await Vehicle.aggregate([{$match:filter}, { $project : { name : 1  } }]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = vehicle;
    res.status(200).json(responseData);
    


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


router.get("/assign_vehicles",async(req,res) => {
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    const modifiedData = [];

    try {
       

        const nooitems = await Vehicle.countDocuments({"isDeleted": "0"});
        const pager = paginate(nooitems, page,resPerPage);

       let vehicleData = await Vehicle.aggregate([{

        $match: {
            "isDeleted":"0"
        }
       }
        
        // , {
        //     $lookup: {
        //         from: "vehicleDetails", // collection to join
        //         let: { "vechDetId": "$vehicleDetailsId" },
        //         pipeline: [
        //             { "$match": { "$expr": { "$eq": ["$vehicleDetailsId", "$$vechDetId"] }}},
        //             { "$project": { "vehicleDetails": 1, "_id": 0 }}
        //         ],
        //         as: "vehicleDetailsArray"// output array field
        //     }
        // }, {
        //     $lookup: {
        //         from: "vehicleStatus", // from collection name
        //         let: { "vechStatusId": "$vehicleStatusId" },
        //         pipeline: [
        //             { "$match": { "$expr": { "$eq": ["$vehicleStatusId", "$$vechStatusId"] }}},
        //             { "$project": { "vehicleStatus": 1, "_id": 0 }}
        //         ],
        //         as: "vehicleStatusArray"
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "worklocation", // from collection name
        //         let: { "worklocid": "$workLocationId" },
        //         pipeline: [
        //             { "$match": { "$expr": { "$eq": ["$workLocationId", "$$worklocid"] }}},
        //             { "$project": { "workLocation": 1, "_id": 0 }}
        //         ],
        //         as: "workLocationArray"
        //     }
        // }
        
        ,
        {
            $skip: skipd
        },
        {
            $limit:resPerPage
        }
       
    
    ]);
    for(let i=0;i<vehicleData.length;i++){
        let ele = {};
        let elemId = vehicleData[i]._id;
        let assignedVal = Object.assign(ele,vehicleData[i]);
        let assignVehicleCollection = await AssignVehicle.findOne({vehicle:elemId}).populate('employee').populate('vehicle').populate('projects').populate('workLocations');

        assignedVal["assign_data"] = assignVehicleCollection;
        modifiedData.push(assignedVal);
    }

    // vehicleData.forEach(async (elem,index)=>{
    //     // console.log(elem._id);
    //     let ele = elem;
    //     let elemId = elem._id;
    //     let assignVehicleCollection = await  AssignVehicle.findOne({vehicleID:elemId}).populate('employeeID');
    //     // console.log(assignVehicleCollection);
    //     ele.employee = assignVehicleCollection;
        
    //      modifiedData.push(ele);

    //     // console.log(elem._id);
    // });
    // console.log(modifiedData);

        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = modifiedData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});


router.get("/",async(req,res) => {
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;


    try {
       

        const nooitems = await Vehicle.countDocuments({"isDeleted": "0"});
        console.log(nooitems);
         // get pager object for specified page
         const pager = paginate(nooitems, page,resPerPage);

       let vehicleData = await Vehicle.aggregate([{

        $match: {
            "isDeleted":"0"
        }
       }
        
        , {
            $lookup: {
                from: "vehicleDetails", // collection to join
                let: { "vechDetId": "$vehicleDetailsId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleDetailsId", "$$vechDetId"] }}},
                    { "$project": { "vehicleDetails": 1, "_id": 0 }}
                ],
                as: "vehicleDetailsArray"// output array field
            }
        },{


            
                $lookup: {
                    from: "vehicleType", // from collection name
                    let: { "vechTypeId": "$vehicle_typeId" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$vehicleTypeId", "$$vechTypeId"] }}},
                        { "$project": { "vehicleType": 1, "_id": 0 }}
                    ],
                    as: "vehicleTypesArray"
                }
            
        },
        
        {
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





router.get("/getAssignVehicle/:id", async (req, res) => {
    const id = req.params.id; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const vehicle = await Vehicle.aggregate([{$match:filter},{
        
            $lookup: {
                from: "vehicleDetails", // collection to join
                let: { "vechDetId": "$vehicleDetailsId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleDetailsId", "$$vechDetId"] }}},
                    { "$project": { "vehicleDetails": 1, "_id": 0 }}
                ],
                as: "vehicleDetailsArray"// output array field
            }
        
    },
    {

        $lookup: {
            from: "vehicleType", // collection to join
            let: { "vechTypeId": "$vehicle_typeId" },
            pipeline: [
                { "$match": { "$expr": { "$eq": ["$vehicleTypeId", "$$vechTypeId"] }}},
                { "$project": { "vehicleType": 1, "_id": 0 }}
            ],
            as: "vehicleTypes"// output array field
        }

    },

    // {

    //     $lookup: {
    //         from: "model", // collection to join
    //         let: { "modelID": "$modelId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$modelId", "$$modelID"] }}},
    //             { "$project": { "model": 1, "_id": 0 }}
    //         ],
    //         as: "vehicleModels"// output array field
    //     }

    // },

    // {

    //     $lookup: {
    //         from: "brand", // collection to join
    //         let: { "brandID": "$brandId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$brandId", "$$brandID"] }}},
    //             { "$project": { "brand": 1, "_id": 0 }}
    //         ],
    //         as: "vehicleBrands"// output array field
    //     }

    // },

    // {

    //     $lookup: {
    //         from: "fuelType", // collection to join
    //         let: { "fuelTypeID": "$fuelTypeId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$fuelTypeId", "$$fuelTypeID"] }}},
    //             { "$project": { "fuelTypeName": 1, "_id": 0 }}
    //         ],
    //         as: "fuelTypes"// output array field
    //     }

    // },

    // {

    //     $lookup: {
    //         from: "fuelMeausrement", // collection to join
    //         let: { "fuelMeausrementID": "$fuelMeausrementId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$fuelMeausrementId", "$$fuelMeausrementID"] }}},
    //             { "$project": { "fuelMeausrement": 1, "_id": 0 }}
    //         ],
    //         as: "fuelMesaureMents"// output array field
    //     }

    // },

    // {

    //     $lookup: {
    //         from: "worklocation", // collection to join
    //         let: { "workLocationID": "$workLocationId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$workLocationId", "$$workLocationID"] }}},
    //             { "$project": { "workLocation": 1, "_id": 0 }}
    //         ],
    //         as: "workLocations"// output array field
    //     }

    // },

    // {

    //     $lookup: {
    //         from: "insuranceCompany", // collection to join
    //         let: { "insuranceCompanyID": "$insuranceCompanyId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$insuranceCompanyId", "$$insuranceCompanyID"] }}},
    //             { "$project": { "insuranceCompanyName": 1, "_id": 0 }}
    //         ],
    //         as: "insuranceAgents"// output array field
    //     }

    // },

    // {

    //     $lookup: {
    //         from: "vehicleOwnership", // collection to join
    //         let: { "vehicleOwnershipID": "$vehicleOwnershipId" },
    //         pipeline: [
    //             { "$match": { "$expr": { "$eq": ["$vehicleOwnershipId", "$$vehicleOwnershipID"] }}},
    //             { "$project": { "vehicleOwnership": 1, "_id": 0 }}
    //         ],
    //         as: "vehicleOwnerships"// output array field
    //     }

    // },

    








]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = vehicle;
    res.status(200).json(responseData);
    


});



router.get("/getAssignedVehicle/:vehichleid", async (req, res) => {
    const id = req.params.vehichleid; //or use req.param('id')
    const filter = { vehicle: mongoose.Types.ObjectId(id) };

    
    let assignVehicleCollection = await AssignVehicle.findOne(filter).populate('employee');


    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = assignVehicleCollection;
    res.status(200).json(responseData);
    


});




module.exports = router;