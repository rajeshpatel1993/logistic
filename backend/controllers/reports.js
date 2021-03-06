const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const qrCode = require('qrcode')

const {Vehicle} = require("../models/vehicle");
const {AssignVehicle} = require("../models/assignVehicle");
const {AssignVehicleHistory} = require("../models/assignVehicleHistory");

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
const { ProjectType } = require("../models/projectType");
const {Expense} = require("../models/expense");
const {ServiceTask} = require("../models/serviceTask");
const {FuelEntry} =  require("../models/fuelEntry");
const {Issue} = require("../models/issue");
const {Employee} = require("../models/employee");

const config = require("../config/config");
const paginationSize = parseInt(config['app'].pagination_size);

const multer = require('multer');

const paginate = require('jw-paginate');




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
    const resPerPage = paginationSize; // results per page
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
        {
            $match: {
                "isDeleted":"0"
            }
        },
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


router.get("/brands/:vehTypeId", async(req,res)=>{
    try{
        let vehTypeId = req.params.vehTypeId;
        let brandsData = await Brand.find({"fk_VechileType":vehTypeId}).select("brandId , brand");
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


router.get("/getIssues",async(req,res) => {

    
    try {
    
        let issueData = await Issue.aggregate([{
    
            $match: {
                "isDeleted":0
            }
           }
            ,
           {
            $lookup: {
                from: "vehicle", // collection to join
                let: { "vehicleId": "$vehicle" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$vehicleId"] }}},
                    { "$project": { "vehicle_typeId":1, "vehicle_code":1,"vehicleImage":1,"name": 1,"regNo":1 }}
                ],
                as: "vehicleData"// output array field
            }
        }
            , {
                $lookup: {
                    from: "employees", // collection to join
                    let: { "empId": "$reportedBy" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$empId"] }}},
                        { "$project": { "firstName":1, "empImage": 1,  "middleName":1, "lastName":1}}
                    ],
                    as: "employeedataReported"// output array field
                }
            },

            {
                $lookup: {
                    from: "employees", // collection to join
                    let: { "empId": "$assignTo" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$empId"] }}},
                        { "$project": { "firstName":1, "empImage": 1,  "middleName":1, "lastName":1}}
                    ],
                    as: "employeedataAssignTo"// output array field
                }
            },

            {
                $lookup: {
                    from: "priorityStatus", // collection to join
                    let: { "priorityId": "$priority" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$priorityId"] }}},
                        { "$project": { "priorityStatus":1, "priorityColor": 1}}
                    ],
                    as: "priorityData"// output array field
                }
            },

            {
                $lookup: {
                    from: "vehicleIssueStatus", // collection to join
                    let: { "statusId": "$status" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$statusId"] }}},
                        { "$project": { "vehicleIssueStatus":1}}
                    ],
                    as: "issueStatusData"// output array field
                }
            },

            
          
           
        
        ]);
    

        let responseData = {};
        responseData["status"] = 200;
        // responseData["page"] = pager;
        responseData["data"] = issueData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});



router.get("/getContacts",async(req,res) => {

    
    try {
    
        let empData = await Employee.aggregate([
            
            
       //     {
    
        //     $match: {
        //         "isDeleted":0
        //     }
        //    }
        //     ,
        {
            $lookup: {
                from: "worklocation", // collection to join
                let: { "workLocationId": "$workLocation" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$workLocationId", "$$workLocationId"] }}},
                    { "$project": { "workLocation":1, "workLocationCode":1 }}
                ],
                as: "workLocationData"// output array field
            }
        },

        {
            $lookup: {
                from: "jobtitle", // collection to join
                let: { "jobTitleId": "$jobTitle" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$jobTitleId", "$$jobTitleId"] }}},
                    { "$project": { "jobTitle":1}}
                ],
                as: "jobTitleData"// output array field
            }
        },
        {
            $lookup: {
                from: "assignVehicle", // collection to join
                let: { "empid": "$_id" },
                pipeline: [
                    { "$match": { "$expr":  { "$eq": ["$employee", "$$empid"] }}},
                    { "$project": { "vehicle":1 }},
                    { "$lookup": {
                        "from": "vehicle",
                        "let": { "vehId": "$vehicle" },
                        "pipeline": [
                          { "$match": { "$expr": { "$eq": ["$_id", "$$vehId"] }}},
                          { "$project": { "name":1 }},
                        ],
                        "as": "vehicledata"
                      }},
                    { 
                        "$unwind" : {
                            "path" : "$vehicledata", 
                            "preserveNullAndEmptyArrays" : false
                        }
                    }, 
                ],
                as: "assignVehicleData"// output array field
            }
        }
        ,
        { $unwind : "$jobTitleData" },
        { $unwind : "$workLocationData" }

            
          
           
        
        ]);
    

        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = empData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});



router.get("/getFuelHistory",async(req,res) => {
    const modifiedData = [];
    try {
       
        let fuelEntryData = await FuelEntry.aggregate([{
    
            $match: {
                "isDeleted":0
            }
           }
            ,
           {
            $lookup: {
                from: "vehicle", // collection to join
                let: { "vehicleId": "$vehicle" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$vehicleId"] }}},
                    { "$project": { "vehicle_typeId":1, "vehicle_code":1,"vehicleImage":1,"name": 1,"regNo":1, "workLocationId": 1 }},
                    { "$lookup": {
                        "from": "vehicleType",
                        "let": { "vehTypeId": "$vehicle_typeId" },
                        "pipeline": [
                          { "$match": { "$expr": { "$eq": ["$vehicleTypeId", "$$vehTypeId"] }}},
                          { "$project": { "vehicleType":1 }},
                        ],
                        "as": "vehicletypedata"
                      }},

                      { 
                        "$lookup": {
                        "from": "worklocation",
                        "let": { "workLocationId": "$workLocationId" },
                        "pipeline": [
                          { "$match": { "$expr": { "$eq": ["$workLocationId", "$$workLocationId"] }}},
                          { "$project": { "workLocation":1 }},
                        ],
                        "as": "workLocationData"
                      }
                    
                    },

                      {
                        
                            "$lookup": {
                            "from": "assignVehicle",
                            "let": { "vehId": "$_id" },
                            "pipeline": [
                              { "$match": { "$expr": { "$eq": ["$vehicle", "$$vehId"] }}},
                              { "$project": { "fuelLimit":1 }},
                            ],
                            "as": "assignedVehicleData"
                          }
                        


                      },

                      {
                        "$unwind": {
                            "path" : "$assignedVehicleData", 
                            "preserveNullAndEmptyArrays" : true

                        }

                      },

                      {
                        "$unwind": {
                            "path" : "$workLocationData", 
                            "preserveNullAndEmptyArrays" : false

                        }

                      },



                    { 
                        "$unwind" : {
                            "path" : "$vehicletypedata", 
                            "preserveNullAndEmptyArrays" : false
                        }
                    }, 
                ],
                as: "vehicleData"// output array field
            }
        }
            , {
                $lookup: {
                    from: "fuelEntryMode", // collection to join
                    let: { "fuelEntryId": "$modeofpayment" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$fuelEntryId"] }}},
                        { "$project": { "fuelEntryMode":1, "_id": 0 }}
                    ],
                    as: "paymentModeData"// output array field
                }
            },

            {
                $lookup: {
                    from: "employees", // collection to join
                    let: { "employeesId": "$driver" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$employeesId"] }}},
                        { "$project": { "firstName":1,"empImage":1, "_id": 0 }}
                    ],
                    as: "employeeData"// output array field
                }
            },

            {
                $lookup: {
                    from: "fuelType", // collection to join
                    let: { "fuelTypeId": "$fuelType" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$fuelTypeId"] }}},
                        { "$project": { "fuelTypeName":1, "_id": 0 }}
                    ],
                    as: "fuelTypeData"// output array field
                }
            }

        
        ]);


        let responseData = {};
        responseData["status"] = 200;
        // responseData["page"] = pager;
        responseData["data"] = fuelEntryData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});


router.get("/getReports",async(req,res) => {
    const modifiedData = [];

    // const resPerPage = 2; // results per page
    // const page = parseInt(req.query.page) || 1; // Page 
    // const skipd = (resPerPage * page) - resPerPage;


    try {
       

        // const nooitems = await Vehicle.countDocuments({"isDeleted": "0"});
        // console.log(nooitems);
        //  // get pager object for specified page
        //  const pager = paginate(nooitems, page,resPerPage);

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
        },
        
        {
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
            $lookup: {
                from: "issues", // from collection name
                let: { "vehId": "$_id" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicle", "$$vehId"] }}},
                    { "$project": { "createdDate": 1, "_id": 0 }},
                    {$limit:1},
                    {$sort: {"createdDate":-1}}
                ],
                as: "issueData"
            }
        },

        {
            $lookup: {
                from: "fuelEntry", // from collection name
                let: { "vehId": "$_id" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicle", "$$vehId"] }}},
                    {
                        $group : {
                            _id : null,
                            total : {
                                $sum : {"$toDouble": "$amount"} 
                            }
                        }
                    }
                ],
                as: "fuelData"
            }
        },
        {
            $lookup: {
                from: "servicetask", // from collection name
                let: { "vehId": "$_id" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicle", "$$vehId"] }}},
                    { "$project": { "createdAt": 1, "_id": 0 }},
                    {$limit:1},
                    {$sort: {"createdAt":-1}}
                ],
                as: "serviceData"
            }
        },

        // { '$unwind': { 'path': '$issueData', 'preserveNullAndEmptyArrays': true } },

        // ,
        // { $unwind : "$issueData" }
        // {
        //     $skip: skipd
        // },
        // {
        //     $limit:resPerPage
        // }
       
    
    ]);

     for(let i=0;i<vehicleData.length;i++){
        let ele = {};
        let elemId = vehicleData[i]._id;
        let assignedVal = Object.assign(ele,vehicleData[i]);
        let assignVehicleCollection = await AssignVehicle.findOne({vehicle:elemId, isDeleted:0}).populate('employee').populate('projects').populate('projectsType');
        assignedVal["assign_data"] = assignVehicleCollection;

        let totalExpenses = await Expense.aggregate([
            {
            $match : { vehicle: elemId,  isDeleted:0},

            },

            {
                $group : {
                    _id : null,
                    total : {
                        $sum : {"$toDouble": "$amount"} 
                    }
                }
            }
        ]);
        assignedVal["total_expense"] = totalExpenses;


        let lastExpense = await Expense.find({vehicle:elemId, isDeleted:0}, {expense_type:1, amount:1}).populate('expense_type', 'expenseType').sort({createdAt: 1}).limit(1);
        assignedVal["last_expense"] = lastExpense;


        modifiedData.push(assignedVal);
    }

        let responseData = {};
        responseData["status"] = 200;
        // responseData["page"] = pager;
        responseData["data"] = modifiedData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});



router.get("/fuel_entry_by_vehicle",async(req,res) => {
    const resPerPage = paginationSize; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    let noofitems;
    try {

        const nooitemsAggregate = await FuelEntry.aggregate([
            {$match: {"isDeleted":0}},
            {$group: {_id: "$vehicle"}},
            {$count : "noofitems"}
        ]);

        if(nooitemsAggregate.length > 0){
            nooitems = nooitemsAggregate[0].noofitems;
        }else{
            nooitems = 0;

        }

       
        const pager = paginate(nooitems, page,resPerPage);

        const vehiclesIds = await FuelEntry.aggregate([
            {$match: {"isDeleted":0}},
            {
                $group:{
                    _id: "$vehicle",
                    driver: { $push: "$driver" } ,
                    type: {$push:"$fuelType"},
                    amounts: {$push: "$amount"}

                }
            },
            
            {
                $lookup:{
                    
                    "from": "employees",
                    "foreignField": "_id",
                    "localField": "driver",
                    "as": "employeeListData"
                }
            },
            {
                $lookup:{
                    
                    "from": "vehicle",
                    "let": { "vehId": "$_id" },
                    "pipeline": [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$vehId"]}}},
                        { "$project": { "vehicleStatusId": 1, "name": 1 , "vehicle_code":1, "vehicleImage":1,}}
                      ],
                      "as": "vehicleDetail"
                }
            },
            // {   $unwind:"$vehicleDetail" },     // $unwind used for getting data in object or for one record only

            // {
            //     $lookup:{
                    
            //         "from": "vehicleStatus",
            //         "let": { "vehId": "$vehicleDetail.vehicleStatusId" },
            //         "pipeline": [
            //             { "$match": { "$expr": { "$eq": ["$vehicleStatusId", "$$vehId"] }}},
            //             { "$project": { "vehicleStatusId": 1, "vehicleStatus": 1 }}
            //           ],
            //           "as": "vehicleStatus"

            //     }
            // },

            // {   $unwind:"$vehicleStatus" },     // $unwind used for getting data in object or for one record only



             
        // {
        //     $skip: skipd
        // },
        // {
        //     $limit:resPerPage
        // }
       
        ]);
        // let expenseData = await Expense.find({"isDeleted": 0}).populate('issue_status').populate('vehicle').populate('vehicleType').populate('expense_type').skip(skipd).limit(resPerPage);
        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = vehiclesIds;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});



router.get("/assign_vehicles",async(req,res) => {
    const modifiedData = [];

    try {
       
        let assignVehicleCollection = await AssignVehicle.find({isDeleted:0}, {}, {lean: true}).populate('employee').populate('vehicle').populate('projects').populate('workLocations').populate('projectsType');

        for(let i=0;i<assignVehicleCollection.length;i++){
            
             let ele = {};
            let elemId = assignVehicleCollection[i].vehicle._id;
            let vehStatusId = assignVehicleCollection[i].vehicle.vehicleStatusId;
            let assignedVal = Object.assign(ele,assignVehicleCollection[i]);
            // console.log(assignedVal);


            let previousDriver = await AssignVehicleHistory.findOne({vehicle:elemId}).populate('employee');
            assignedVal["previousDriver"] = previousDriver;
            modifiedData.push(assignedVal);

            let vehStatus = await VehicleStatus.findOne({vehicleStatusId:vehStatusId});
            assignedVal["vehicleStatus"] = vehStatus;
            modifiedData.push(assignedVal);
        }
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = modifiedData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});



router.get("/vehicle_services",async(req,res) => {
    const modifiedData = [];


    try {
       
        let serviceTaskData = await ServiceTask.find({"isDeleted": 0},{},{lean: true}).populate('employee').populate('vehicle').populate('vehicleType').populate('serviceType');

        for(let i=0;i<serviceTaskData.length;i++){
            
            let ele = {};
           let elemId = serviceTaskData[i].vehicle._id;
           let assignedVal = Object.assign(ele,serviceTaskData[i]);
           // console.log(assignedVal);

           let previousService = await ServiceTask.find({vehicle:elemId}).sort({createdAt: 1}).limit(1);
           assignedVal["previousService"] = previousService;
           modifiedData.push(assignedVal);
       }

        let responseData = {};
        responseData["status"] = 200;
        // responseData["page"] = pager;
        responseData["data"] = modifiedData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});



router.get("/serviceTypeGraph",async(req,res) => {

    try {
       
        let serviceTypeGraphData = await ServiceTask.aggregate(
            [
            {$match:{"isDeleted": 0}},
            {
                 $group: { 
                     
                    _id: "$serviceType", 
                    total: { 
                        $sum: {"$toDouble":"$amount"} 
                    } ,
                    countA: { $sum: 1}
                
                } 


            },



            {
                $sort:{'countA':-1}
            },

            {
                $lookup: {
                        from: "servicetype",
                        localField: "_id",
                        foreignField: "_id",
                        as: "serviceTypeData"
                }
            }

    
        ]);

        // console.log(serviceTypeGraphData);

        let responseData = {};
        responseData["status"] = 200;
        // responseData["page"] = pager;
        responseData["data"] = serviceTypeGraphData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});


router.get("/vehicle_expenses",async(req,res) => {
    const modifiedData = [];

    try {
        let expenseData = await Expense.find({"isDeleted": 0},{},{lean: true}).populate('issue_status').populate('vehicle').populate('vehicleType').populate('expense_type');


        for(let i=0;i<expenseData.length;i++){
            
            let ele = {};
           let elemId = expenseData[i].vehicle._id;
           let assignedVal = Object.assign(ele,expenseData[i]);
           // console.log(assignedVal);

           let previousExpense = await Expense.find({vehicle:elemId}).populate('expense_type').sort({createdAt: 1}).limit(1);
           assignedVal["previousExpense"] = previousExpense;
           modifiedData.push(assignedVal);
       }

        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = modifiedData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});





module.exports = router;