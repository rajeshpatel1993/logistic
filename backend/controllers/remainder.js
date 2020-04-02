const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {remainderType} = require("../models/remainderType");
const {Remainder} = require("../models/remainder");

const paginate = require('jw-paginate');

router.get("/types", async(req,res)=>{
    try{
        let remainderTypeData = await remainderType.find();
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = remainderTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.post("/deleteRemainder", async (req, res) => {
    try{

        let {id} = req.body;
        const filter = { _id: mongoose.Types.ObjectId(id) };
        const update = { isDeleted: 1 };
        let updateVehicle = await Remainder.findOneAndUpdate(filter, update);
        res.status(200).json({"msg":"saved successfully"});
        // console.log(updateVehicle);

    }catch(error){
        console.log(error);
    }
});


router.post("/add", async (req, res)=> {
    try{

        let imgUrl = "";
        let {category, remainder_name, subject,expiration_date,expiration_time,interval, email_lists, owner, template, notes, enable,alert_after_expiration, attach_file_unique_id, reminderType, vehicleTypef, vehicle} = req.body;
        let remainderImage = await File.find({fileId:attach_file_unique_id }).select("s3Urls");
         console.log(reminderType);
        if(remainderImage.length > 0){
          imgUrl = vehicleImage[0].s3Urls[0];
        }

        let savedata = {remainderType:category, remainderName: remainder_name, subject : subject , expirationDate: expiration_date, expirationTime : expiration_time , 
            remainderInterval : interval, emailList : email_lists, ownerEmail : owner,
            template: template, notes : notes , enabledisable : enable, afterexpiration: alert_after_expiration,
            fileId:attach_file_unique_id, remindert: reminderType, vehicleTypef:vehicleTypef.id, vehicle:vehicle.id,
            imageUrl:imgUrl
        
        };

        // console.log(savedata);
    
        const remainder_instance = new Remainder(savedata);
        let sData = await remainder_instance.save();
        // console.log(sData);
        res.status(200).send(sData);
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
           
    
            const nooitems = await Remainder.countDocuments({"isDeleted": +0});

            const pager = paginate(nooitems, page,resPerPage);
    
           let remainderData = await Remainder.aggregate([{
    
            $match: {
                "isDeleted":0
            }
           }
            
            , {
                $lookup: {
                    from: "remainderType", // collection to join
                    let: { "remainderTypeId": "$remainderType" },
                    pipeline: [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$remainderTypeId"] }}},
                        { "$project": { "name": 1, "_id": 0 }}
                    ],
                    as: "remainderTypeData"// output array field
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
            responseData["data"] = remainderData;
            res.status(200).json(responseData);
        } catch (error) {
            console.log(error);
        }
});



router.get("/getRemainder/:id", async (req, res) => {
    const id = req.params.id; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const vehicle = await Remainder.aggregate([{$match:filter}

]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = vehicle;
    res.status(200).json(responseData);
    


});


router.post("/updateRemainder", async (req, res)=> {
    // let {asset} = req.body;
    try{

        let imgUrl = "";
        let {category, remainder_name, subject,expiration_date,expiration_time,interval, email_lists, owner, template, notes, enable,alert_after_expiration, attach_file_unique_id, remainder_id} = req.body;
        let remainderImage = await File.find({fileId:attach_file_unique_id }).select("s3Urls");
        //  console.log(vehicleImage)
        if(remainderImage.length > 0){
          imgUrl = vehicleImage[0].s3Urls[0];
        }



        let updateData = {remainderType:category, remainderName: remainder_name, subject : subject , expirationDate: expiration_date, expirationTime : expiration_time , 
            remainderInterval : interval, emailList : email_lists, ownerEmail : owner,template: template, notes : notes , enabledisable : enable, afterexpiration: alert_after_expiration,
            fileId:attach_file_unique_id,
            imageUrl:imgUrl
        
        };


        const filter = { _id: mongoose.Types.ObjectId(remainder_id) };
        const update = updateData;


        let doc = await Remainder.findOneAndUpdate(filter, updateData, {
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