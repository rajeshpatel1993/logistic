const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {PriorityStatus} = require("../models/priorityStatus");
const {Issue} = require("../models/issue");

const paginate = require('jw-paginate');

const config = require("../config/config");
const paginationSize = parseInt(config['app'].pagination_size);

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



router.get("/filterIssueData", async(req,res)=>{
   
    let matchCondition = [];
    let vehicleName = req.query.vehicleName;
    let issuesStatus = req.query.issuesStatus;
    let priority = req.query.priority;
    let issueData;

    if(vehicleName && vehicleName != 'null'){
        matchCondition.push({"vehicle" : mongoose.Types.ObjectId(vehicleName) });
    }
    if(issuesStatus && issuesStatus != 'null'){
        matchCondition.push({"status" : mongoose.Types.ObjectId(issuesStatus)});
    }
    if(priority && priority != 'null'){
        matchCondition.push({"priority" : mongoose.Types.ObjectId(priority)});
    }

    matchCondition.push({"isDeleted":0});
    const resPerPage = paginationSize; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    let nooitems ;
    let pager;

    try {
       if(matchCondition.length > 0){
        const nooitemsAggregate = await Issue.aggregate([
            {$match: {$and: matchCondition}},
            {$count : "noofitems"}
        ]);

        if(nooitemsAggregate.length > 0){
            nooitems = nooitemsAggregate[0].noofitems;
        }else{
            nooitems = 0;

        }
         pager = paginate(nooitems, page,resPerPage);


          issueData = await Issue.aggregate([
            {$match: {$and: matchCondition}}
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

            
            {
                $skip: skipd
            },
            {
                $limit:resPerPage
            }
           
        
        ]);


    }else{


       
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

            
            {
                $skip: skipd
            },
            {
                $limit:resPerPage
            }
           
        
        ]);
    }

 


        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = issueData;
        res.status(200).json(responseData);
    } catch (error) {
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
        const resPerPage = paginationSize; // results per page
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




router.post("/updateIssue", async (req, res)=> {
    try{

        let imgUrl = "";
        let billUrls = "";
        let {note, reported_date, reported_time, reportedBy, assignTo,
            summary, description, odometer, priority, status, attachments, images, notify_assignee, issueId} = req.body;
           
            let issueImage = await File.find({fileId:images }).select("s3Urls");
            //  console.log(vehicleImage)
            if(issueImage.length > 0){
            imgUrl = issueImage[0].s3Urls;
            }
    
            let issueBills = await File.find({fileId:attachments }).select("s3Urls");
        
            if(issueBills.length > 0){
                issueBills = issueBills[0].s3Urls;
            }
        


        let updateData = {
            note : note, reported_date,reported_time, summary,
            description, odometer,notify_assignee, imageUrl : imgUrl , billUrl : billUrls,
            image_file_unique_id:images, bill_file_unique_id:attachments
        
        };

        if(typeof reportedBy != "string"){
            updateData['reportedBy'] = reportedBy.id;

        }

        if(typeof assignTo != "string"){
            updateData['assignTo'] = assignTo.id;

        }


        if(typeof priority != "string"){
            updateData['priority'] = priority.id;

        }

        if(typeof status != "string"){
            updateData['status'] = status.id;

        }






        // console.log(updateData);

        const filter = { _id: mongoose.Types.ObjectId(issueId) };
        const update = updateData;


        let doc = await Issue.findOneAndUpdate(filter, updateData, {
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