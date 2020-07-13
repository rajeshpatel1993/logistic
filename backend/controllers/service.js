const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {ServiceType} = require("../models/serviceType");
const {ServiceTask} = require("../models/serviceTask");
const {Vehicle} = require("../models/vehicle");

const config = require("../config/config");
const paginationSize = parseInt(config['app'].pagination_size);


const paginate = require('jw-paginate');

router.get("/types", async(req,res)=>{
    try{
        let serviceTypeData = await ServiceType.find().select("serviceTaskName");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = serviceTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.post("/update-service/:serviceId", async (req, res)=> {
    let serviceID = req.params.serviceId;
    try{
        // console.log(req.body);
        let filesurls = [];
        let imageurls = [];
        let {vehicle_type, vehicle, service_type,odometer,completion_date_time, start_date, vendor, 
            reference, description, amount, attachments, images, in_charge, comment} = req.body;
    
        let serviceFiles = await File.find({fileId:attachments }).select("s3Urls");
        if(serviceFiles.length > 0){
            filesurls = serviceFiles[0].s3Urls; 
        }

        let imageFiles = await File.find({fileId:images }).select("s3Urls");
        // console.log(imageFiles);
        if(imageFiles.length > 0){
            imageurls = imageFiles[0].s3Urls; 
        }


        const query = {"_id":serviceID};

        
        const update = {
            odometer: odometer,
            completion_date_time : completion_date_time , 
            start_date : start_date, vendor :vendor, reference : reference, description:description, amount: amount, attachments : filesurls , images : imageurls,
           comments: comment
       
       };

        if(vehicle_type && typeof vehicle_type != "string"){
            update["vehicleType"] = vehicle_type._id;
        }

        if(vehicle && typeof vehicle != "string"){
            update["vehicle"] = vehicle.id;
        }

        if(service_type && typeof service_type != "string"){
            update["serviceType"] = service_type.id;
        }

        if(in_charge && typeof in_charge != "string"){
            update["employee"] = in_charge.id;
        }

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        let saveData = await ServiceTask.findOneAndUpdate(query, update, options);


        // const vehicle_service_instance = new ServiceTask({vehicleType:vehicle_type._id, vehicle: vehicle.id, serviceType : service_type.id , odometer: odometer,
        //      completion_date_time : completion_date_time , 
        //      start_date : start_date, vendor :vendor, reference : reference, description:description, amount: amount, attachments : filesurls , images : imageurls,
        //      employee : in_charge.id,  comments: comment
        
        // });
        // let saveData = await vehicle_service_instance.save();
        if(saveData){
            res.status(200).json({"msg":"saved successfully"});
        }


    }catch(err){
        console.log(err);
    }
    
    
});



router.post("/add", async (req, res)=> {
    try{
        // console.log(req.body);
        let filesurls = [];
        let imageurls = [];
        let {vehicle_type, vehicle, service_type,odometer,completion_date_time, start_date, vendor, 
            reference, description, amount, attachments, images, in_charge, comment} = req.body;
    
        let serviceFiles = await File.find({fileId:attachments }).select("s3Urls");
        if(serviceFiles.length > 0){
            filesurls = serviceFiles[0].s3Urls; 
        }

        let imageFiles = await File.find({fileId:images }).select("s3Urls");
        
        if(imageFiles.length > 0){
            imageurls = imageFiles[0].s3Urls; 
        }

        let vehicleDat = await Vehicle.findOne({"_id":mongoose.Types.ObjectId(vehicle.id)});


        const vehicle_service_instance = new ServiceTask(
            {vehicleType:vehicle_type._id,vehicleForSearch:vehicleDat, vehicle: vehicle.id, serviceType : service_type.id , odometer: odometer,
             completion_date_time : completion_date_time , 
             start_date : start_date, vendor :vendor, reference : reference, description:description, amount: amount, attachments : filesurls , images : imageurls,
             employee : in_charge.id,  comments: comment
        
        }
        );
        let saveData = await vehicle_service_instance.save();
        if(saveData){
            res.status(200).json({"msg":"saved successfully"});
        }


    }catch(err){
        console.log(err);
    }
    
    
});


router.get("/vehicle_services",async(req,res) => {
    const resPerPage = paginationSize; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;

    try {
       
        const nooitems = await ServiceTask.countDocuments();
        const pager = paginate(nooitems, page,resPerPage);
        let serviceTaskData = await ServiceTask.find({"isDeleted": 0}).populate('employee').populate('vehicle').populate('vehicleType').populate('serviceType').skip(skipd).limit(resPerPage);
        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = serviceTaskData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});


router.get("/filterServiceVehicle", async(req,res)=>{
   
    let matchCondition = [];
    let vehicleType = req.query.vehicleType;
    let vehicleDetail = req.query.vehicleDetail;
    let vehicleReg = req.query.vehicleReg;
    let vehicleData;
    let serviceTaskData;

    if(vehicleType && vehicleType != 'null'){
        matchCondition.push({"vehicleForSearch.vehicle_typeId" : vehicleType });
    }
    if(vehicleDetail && vehicleDetail != 'null'){
        matchCondition.push({"vehicleForSearch.vehicleDetailsId" : vehicleDetail});
    }
    if(vehicleReg && vehicleReg != 'null'){
        matchCondition.push({"vehicleForSearch.regNo" : vehicleReg});
    }
    matchCondition.push({"isDeleted":0});

    const resPerPage = paginationSize; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    let nooitems ;
    let pager;

    try {
       if(matchCondition.length > 0){
        const nooitemsAggregate = await ServiceTask.aggregate([
            {$match: {$and: matchCondition}},
            {$count : "noofitems"}
        ]);

        if(nooitemsAggregate.length > 0){
            nooitems = nooitemsAggregate[0].noofitems;
        }else{
            nooitems = 0;

        }
         pager = paginate(nooitems, page,resPerPage);


        serviceTaskData = await ServiceTask.find({$and: matchCondition}).populate('employee').populate('vehicle').populate('vehicleType').populate('serviceType').skip(skipd).limit(resPerPage);



    }else{
        nooitems = await ServiceTask.countDocuments({"isDeleted": 0});
        pager = paginate(nooitems, page,resPerPage);
        serviceTaskData = await ServiceTask.find({"isDeleted": 0}).populate('employee').populate('vehicle').populate('vehicleType').populate('serviceType').skip(skipd).limit(resPerPage);

    }

 


        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = serviceTaskData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});


router.post("/deleteService", async (req, res) => {
    try{

        let {id} = req.body;
        const filter = { _id: mongoose.Types.ObjectId(id) };
        const update = { "isDeleted": 1 };
        let updateVehicle = await ServiceTask.findOneAndUpdate(filter, update);
        res.status(200).json({"msg":"saved successfully"});
        // console.log(updateVehicle);

    }catch(error){
        console.log(error);
    }
});


router.get("/vehicleService/:serviceId", async (req, res) => {
    const id = req.params.serviceId; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    let vehicleServiceData = await ServiceTask.findOne(filter).populate('employee').populate('vehicleType').populate('vehicle').populate('serviceType');
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = vehicleServiceData;
    res.status(200).json(responseData);
    


});











module.exports = router;