const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {ServiceType} = require("../models/serviceType");
const {ServiceTask} = require("../models/serviceTask");
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

router.post("/add", async (req, res)=> {
    try{
        // console.log(req.body);
        let filesurls = [];
        let imageurls = [];
        let {vehicle_type, vehicle, service_type,odometer,completion_date_time, start_date, vendor, 
            reference, description, amount, attachments, images, in_charge, comment} = req.body;
    
        let serviceFiles = await File.find({fileId:attachments }).select("s3Urls");
        if(serviceFiles){
            filesurls = serviceFiles[0].s3Urls; 
        }

        let imageFiles = await File.find({fileId:images }).select("s3Urls");
        console.log(imageFiles);
        if(imageFiles.length > 0){
            imageurls = imageFiles[0].s3Urls; 
        }


        const vehicle_service_instance = new ServiceTask({vehicleType:vehicle_type._id, vehicle: vehicle.id, serviceType : service_type.id , odometer: odometer,
             completion_date_time : completion_date_time , 
             start_date : start_date, vendor :vendor, reference : reference, description:description, amount: amount, attachments : filesurls , images : imageurls,
             employee : in_charge.id,  comments: comment
        
        });
        let saveData = await vehicle_service_instance.save();
        if(saveData){
            res.status(200).json({"msg":"saved successfully"});
        }


    }catch(err){
        console.log(err);
    }
    
    
});


router.get("/vehicle_services",async(req,res) => {
    const resPerPage = 2; // results per page
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







module.exports = router;