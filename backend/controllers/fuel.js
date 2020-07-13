const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {fuelEntryMode} = require("../models/fuelEntryMode");
const {FuelEntry} =  require("../models/fuelEntry");
const {Remainder} = require("../models/remainder");
const {FuelType} = require("../models/fuelType");
const {Vehicle} = require("../models/vehicle");
const config = require("../config/config");
const paginationSize = parseInt(config['app'].pagination_size);

const paginate = require('jw-paginate');

router.get("/paymentmodes", async(req,res)=>{
    try{
        let paymentModeData = await fuelEntryMode.find();
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = paymentModeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/fuelTypeList", async(req,res)=>{
    try{
        let fuelTypeData = await FuelType.find();
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = fuelTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});



router.post("/deleteFuelEntry", async (req, res) => {
    try{

        let {id} = req.body;
        const filter = { _id: mongoose.Types.ObjectId(id) };
        const update = { isDeleted: 1 };
        let updateFuel = await FuelEntry.findOneAndUpdate(filter, update);
        res.status(200).json({"msg":"saved successfully"});
        // console.log(updateVehicle);

    }catch(error){
        console.log(error);
    }
});


router.post("/add", async (req, res)=> {
    // let {asset} = req.body;
    try{
        // console.log(req.body);
    
        let imgUrl = "";
        let billUrls = "";
        let {vehicleTypef, vehiclename,expiration_time, expiration_date, amount, odometer, modeofpayment,
            cardno, couponfrom, couponto, couponvalue, priceunit, unit, vendorname,drivernameid,
            comment,bill_file_unique_id, image_file_unique_id, fuelTypeid} = req.body;
           
    
        let fuelEntryImage = await File.find({fileId:image_file_unique_id }).select("s3Urls");
        //  console.log(vehicleImage)
            if(fuelEntryImage.length > 0){
            imgUrl = fuelEntryImage[0].s3Urls[0];
            }

        let fuelBills = await File.find({fileId:bill_file_unique_id }).select("s3Urls");
        let vehicleDat = await Vehicle.findOne({"_id":mongoose.Types.ObjectId(vehiclename.id)});
        //console.log(vehicleDat);

    
        if(fuelBills.length > 0){
            billUrls = fuelBills[0].s3Urls;
        }
    
        let savedata = {vehicle:vehiclename.id , 
            // expiration_date : expiration_date, expiration_time : expiration_time,
            vehicleForSearch: vehicleDat,
             amount : amount,
            odometer: odometer, modeofpayment : modeofpayment , cardno : cardno,
            couponfrom : couponfrom,  couponto: couponto, couponvalue: couponvalue,
           priceunit: priceunit,unit:unit,vendorname:vendorname,driver:drivernameid,
            fuelType: fuelTypeid,
            comment: comment,image_file_unique_id, bill_file_unique_id, imageUrl: imgUrl,billUrl:billUrls
        
        };
    
        try{
            const fuel_instance = new FuelEntry(savedata);
            let sData = await fuel_instance.save();
           // let sPopData = fuel_instance.populate('vehicle').execPopulate();
            res.status(200).send(sData);
            
        }catch(err){
            console.log(err);
        }
     
     
        // res.status(200).json(req.body);
    }catch(err){
         console.log(err);
       // res.status(400).send(err);
        
    }
    
    
    });

    
    


router.get("/filterFuels", async(req,res)=>{
   
    let matchCondition = [];
    let vehicleType = req.query.vehicleType;
    let vehicleDetail = req.query.vehicleDetail;
    let vehicleReg = req.query.vehicleReg;
    let fuelType = req.query.fuelType;
    let driver = req.query.driverName;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;

    if(vehicleType){
        matchCondition.push({"vehicleForSearch.vehicle_typeId" : vehicleType });
    }
    if(vehicleDetail){
        matchCondition.push({"vehicleForSearch.vehicleDetailsId": vehicleDetail});
    }
    if(vehicleReg){
        matchCondition.push({"vehicleForSearch.regNo" : vehicleReg});
    }

    if(fuelType){
        matchCondition.push({"fuelType" : mongoose.Types.ObjectId(fuelType)});
    }

    if(driver){
        matchCondition.push({"driver" : mongoose.Types.ObjectId(driver)});
    }

    matchCondition.push({ "isDeleted":0});
    const resPerPage = paginationSize; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    let nooitems ;

    try {
       

        const nooitemsAggregate = await FuelEntry.aggregate([
            {$match: {$and: matchCondition}},
            {$count : "noofitems"}
        ]);

        console.log(nooitemsAggregate);

        if(nooitemsAggregate.length > 0){
            nooitems = nooitemsAggregate[0].noofitems;
        }else{
            nooitems = 0;

        }
        const pager = paginate(nooitems, page,resPerPage);


  

    let fuelEntryData = await FuelEntry.aggregate([
        
        { $match: { $and: matchCondition } },
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
        , 
    {
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
            $skip: skipd
        },
        {
            $limit:resPerPage
        }
       
    
    ]);

    //console.log(fuelEntryData);

        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = fuelEntryData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});



    router.get("/",async(req,res) => {
        const resPerPage = paginationSize; // results per page
        const page = parseInt(req.query.page) || 1; // Page 
        const skipd = (resPerPage * page) - resPerPage;
    
    
        try {
           
    
            const nooitems = await FuelEntry.countDocuments({"isDeleted": +0});

            const pager = paginate(nooitems, page,resPerPage);
    
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
                    { "$project": { "vehicle_typeId":1, "vehicle_code":1,"vehicleImage":1,"name": 1,"regNo":1 }}
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
                $skip: skipd
            },
            {
                $limit:resPerPage
            }
           
        
        ]);
    
            let responseData = {};
            responseData["status"] = 200;
            responseData["page"] = pager;
            responseData["data"] = fuelEntryData;
            res.status(200).json(responseData);
        } catch (error) {
            console.log(error);
        }
});



router.get("/getFuel/:id", async (req, res) => {
    const id = req.params.id; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const fuelEntry = await FuelEntry.aggregate([{$match:filter},
        {
            $lookup: {
                from: "vehicle", // collection to join
                let: { "vehicleId": "$vehicle" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$_id", "$$vehicleId"] }}},
                    { "$project": { "vehicle_typeId":1, "vehicle_code":1,"vehicleImage":1,"name": 1,"regNo":1, "_id": 0 }}
                ],
                as: "vehicleData"// output array field
            }
        }
        // ,

        // {
        //     $lookup: {
        //         from: "vehicleType", // collection to join
        //         let: { "vehicleTypeIdD": "$vehicleData[0].vehicle_typeId" },
        //         pipeline: [
        //             { "$match": { "$expr": { "$eq": ["$vehicleTypeId", "$$vehicleTypeIdD"] }}},
        //             { "$project": { "vehicleType": 1, "_id": 0 }}
        //         ],
        //         as: "vehicleTypeData"// output array field
        //     }
        // }

            , {
                $lookup: {
                    from: "fuelEntryMode", // collection to join
                    let: { "fuelEntryId": "$modeofpayment" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$fuelEntryId"] }}},
                        { "$project": { "fuelEntryMode":1 }}
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
                        { "$project": { "firstName":1,"empImage":1 }}
                    ],
                    as: "employeeData"// output array field
                }
            }
    
    ]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = fuelEntry;
    res.status(200).json(responseData);
    


});


router.post("/updateFuelEntry", async (req, res)=> {
    try{

        let imgUrl = "";
        let billUrls = "";
        let {expiration_time, expiration_date, amount, odometer, modeofpayment,
            cardno, couponfrom, couponto, couponvalue, type, priceunit, unit, vendorname,drivername,
            comment,bill_file_unique_id, image_file_unique_id, fuel_entry_id} = req.body;
           
    
        let fuelEntryImage = await File.find({fileId:image_file_unique_id }).select("s3Urls");
        //  console.log(vehicleImage)
            if(fuelEntryImage.length > 0){
            imgUrl = fuelEntryImage[0].s3Urls[0];
            }

        let fuelBills = await File.find({fileId:bill_file_unique_id }).select("s3Urls");
    
        if(fuelBills.length > 0){
            billUrls = fuelBills[0].s3Urls;
        }
    


        let updateData = {
            expiration_date : expiration_date, expiration_time : expiration_time, amount : amount,
            odometer: odometer, modeofpayment : modeofpayment , cardno : cardno,
            couponfrom : couponfrom,  couponto: couponto, couponvalue: couponvalue,
            type: type,priceunit: priceunit,unit:unit,vendorname:vendorname,
            comment: comment,image_file_unique_id, bill_file_unique_id, imageUrl: imgUrl,billUrl:billUrls
        
        };

        if(typeof drivername != "string"){
            updateData['driver'] = drivername.id;

        }


        // console.log(updateData);

        const filter = { _id: mongoose.Types.ObjectId(fuel_entry_id) };
        const update = updateData;


        let doc = await FuelEntry.findOneAndUpdate(filter, updateData, {
            new: true,
            upsert: true // Make this update into an upsert
            });

        
        if(doc){
            res.status(200).json({"msg":"saved successfully"});
        }

    }catch(err){
        //  console.log(err);
         res.status(400).send(err);

    }
    
    
});







router.post("/fuelExpensesByDays", async (req, res) => {
    let {startDate,endDate} = req.body;
    // let vehicleId = req.params.vehicleId;
    let filter;
    // if(startDate && endDate){

    //     filter = {$and: [{"isDeleted":0}, {"createdAt" : 
    //     {
    //         "$gte" : new Date(startDate), 
    //         "$lt" : new Date(endDate) 
    //     }}] };
        
    // }else{
    //     filter = {$and: [{ vehicle:  mongoose.Types.ObjectId(vehicleId)},{"isDeleted":0}] };
    // }

    filter = {$and: [{"isDeleted":0}] };
 

    try{
    let fuelExpenseData = await FuelEntry.aggregate([
        {
            $match: filter
        }
        ,

        {
            $project: {
                "createdAtWeek": { "$week": "$createdDate" },
                "createdAtMonth": { "$month": "$createdDate" },
                "amount": 1
            }
        },
        {
            "$group": {
                "_id": "$createdAtWeek",
                total: { 
                    $sum: {"$toDouble":"$amount" }
                } ,
                "month": { "$first": "$createdAtMonth" }
            }
       },
        
        
        

    //     { "$lookup": {
    //         "from": "expenseType",
    //         "localField": "_id",
    //         "foreignField": "_id",
    //         "as": "expensesTypes"
    //    }},
    //    { "$unwind": { "path" : "$expensesTypes" } },

        
    ]);

        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = fuelExpenseData;
        res.status(200).json(responseData);
        
    }catch(error){
        console.log(error);
    }
   

    
});




module.exports = router;