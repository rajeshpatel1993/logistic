const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {PriorityStatus} = require("../models/priorityStatus");
const {Issue} = require("../models/issue");

const paginate = require('jw-paginate');



router.get("/getPriorityStatus", async(req,res)=>{
    try{
        let priorityStatusData = await PriorityStatus.find().select("priorityStatus priorityColor ");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = priorityStatusData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});






router.post("/deleteIssues", async (req, res) => {
    try{

        let {id} = req.body;
        const filter = { _id: mongoose.Types.ObjectId(id) };
        const update = { isDeleted: 1 };
        let updateFuel = await Issue.findOneAndUpdate(filter, update);
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
        let {vehicle,note, reported_date, reported_time, reportedBy, assignTo,
            summary, description, odometer, priority, status, attachments, images, notify_assignee} = req.body;
           
    
        let issueImage = await File.find({fileId:images }).select("s3Urls");
        //  console.log(vehicleImage)
            if(issueImage.length > 0){
            imgUrl = issueImage[0].s3Urls;
            }

        let issueBills = await File.find({fileId:attachments }).select("s3Urls");
    
        if(issueBills.length > 0){
            issueBills = issueBills[0].s3Urls;
        }
    
        let savedata = {vehicle:vehicle.id , 
            reported_date : reported_date, reported_time : reported_time, reportedBy : reportedBy.id,
            assignTo: assignTo.id, summary : summary , description : description,
            odometer : odometer,  priority: priority.id, notify_assignee: notify_assignee,
            status: status.id,note: note,imageUrl:issueImage,billUrl:issueBills,
            image_file_unique_id:images, bill_file_unique_id:attachments
        
        };
    
        try{
            const issueInstance = new Issue(savedata);
            let sData = await issueInstance.save();
            res.status(200).send(sData);
            
        }catch(err){
            console.log(err);
        }
     
     
        // res.status(200).json(req.body);
    }catch(err){
        // res.status(400).send(err);
        console.log(err);
    }
    
    
    });

    
    


    router.get("/",async(req,res) => {
        const resPerPage = 2; // results per page
        const page = parseInt(req.query.page) || 1; // Page 
        const skipd = (resPerPage * page) - resPerPage;
    
    
        try {
           
    
            const nooitems = await Issue.countDocuments({"isDeleted": +0});

            const pager = paginate(nooitems, page,resPerPage);
    
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
                    { "$project": { "vehicle_typeId":1, "vehicle_code":1,"vehicleImage":1,"name": 1,"regNo":1, "_id": 0 }}
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
            responseData["data"] = issueData;
            res.status(200).json(responseData);
        } catch (error) {
            console.log(error);
        }
});



router.get("/getIssue/:id", async (req, res) => {
    const id = req.params.id; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const IssueData = await Issue.aggregate([{$match:filter},
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
            }

    
    ]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = IssueData;
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




module.exports = router;