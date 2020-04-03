const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {fuelEntryMode} = require("../models/fuelEntryMode");
const {FuelEntry} =  require("../models/fuelEntry");
const {Remainder} = require("../models/remainder");

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


// router.post("/deleteRemainder", async (req, res) => {
//     try{

//         let {id} = req.body;
//         const filter = { _id: mongoose.Types.ObjectId(id) };
//         const update = { isDeleted: 1 };
//         let updateVehicle = await Remainder.findOneAndUpdate(filter, update);
//         res.status(200).json({"msg":"saved successfully"});
//         // console.log(updateVehicle);

//     }catch(error){
//         console.log(error);
//     }
// });


router.post("/add", async (req, res)=> {
    // let {asset} = req.body;
    try{
        // console.log(req.body);
    
        let imgUrl = "";
        let billUrls = "";
        let {vehicleTypef, vehiclename,expiration_time, expiration_date, amount, odometer, modeofpayment,
            cardno, couponfrom, couponto, couponvalue, type, priceunit, unit, vendorname,drivername,
            comment,bill_file_unique_id, image_file_unique_id} = req.body;
           
    
            let fuelEntryImage = await File.find({fileId:image_file_unique_id }).select("s3Urls");
            //  console.log(vehicleImage)
             if(fuelEntryImage.length > 0){
                imgUrl = fuelEntryImage[0].s3Urls[0];
             }

            let fuelBills = await File.find({fileId:bill_file_unique_id }).select("s3Urls");
        
            if(fuelBills.length > 0){
                billUrls = fuelBills[0].s3Urls;
            }
    
        let savedata = {vehicle:vehiclename.id , 
            expiration_date : expiration_date, expiration_time : expiration_time, amount : amount,
            odometer: odometer, modeofpayment : modeofpayment , cardno : cardno,
            couponfrom : couponfrom,  couponto: couponto, couponvalue: couponvalue,
            type: type,priceunit: priceunit,unit:unit,vendorname:vendorname,driver:drivername.id,
            comment: comment,image_file_unique_id, bill_file_unique_id, imageUrl: imgUrl,billUrl:billUrls
        
        };
    
        try{
            const fuel_instance = new FuelEntry(savedata);
            let sData = await fuel_instance.save();
            res.status(200).send(sData);
            
        }catch(err){
            console.log(err);
        }
     
     
        // res.status(200).json(req.body);
    }catch(err){
        res.status(400).send(err);
        // console.log(err);
    }
    
    
    });

    
    

// router.get("/",async(req,res) => {
//         const resPerPage = 2; // results per page
//         const page = parseInt(req.query.page) || 1; // Page 
//         const skipd = (resPerPage * page) - resPerPage;
    
    
//         try {
           
    
//             const nooitems = await Remainder.countDocuments({"isDeleted": +0});

//             const pager = paginate(nooitems, page,resPerPage);
    
//            let remainderData = await Remainder.aggregate([{
    
//             $match: {
//                 "isDeleted":0
//             }
//            }
            
//             , {
//                 $lookup: {
//                     from: "remainderType", // collection to join
//                     let: { "remainderTypeId": "$remainderType" },
//                     pipeline: [
//                         { "$match": { "$expr": { "$eq": ["$_id", "$$remainderTypeId"] }}},
//                         { "$project": { "name": 1, "_id": 0 }}
//                     ],
//                     as: "remainderTypeData"// output array field
//                 }
//             },
            
//             {
//                 $skip: skipd
//             },
//             {
//                 $limit:resPerPage
//             }
           
        
//         ]);
    
//             let responseData = {};
//             responseData["status"] = 200;
//             responseData["page"] = pager;
//             responseData["data"] = remainderData;
//             res.status(200).json(responseData);
//         } catch (error) {
//             console.log(error);
//         }
// });



// router.get("/getRemainder/:id", async (req, res) => {
//     const id = req.params.id; //or use req.param('id')
//     const filter = { _id: mongoose.Types.ObjectId(id) };
//     const vehicle = await Remainder.aggregate([{$match:filter}

// ]);
    
//     let responseData = {};
//     responseData["status"] = 200;
//     responseData["data"] = vehicle;
//     res.status(200).json(responseData);
    


// });


// router.post("/updateRemainder", async (req, res)=> {
//     // let {asset} = req.body;
//     try{

//         let imgUrl = "";
//         let {category, remainder_name, subject,expiration_date,expiration_time,interval, email_lists, owner, template, notes, enable,alert_after_expiration, attach_file_unique_id, remainder_id} = req.body;
//         let remainderImage = await File.find({fileId:attach_file_unique_id }).select("s3Urls");
//         //  console.log(vehicleImage)
//         if(remainderImage.length > 0){
//           imgUrl = vehicleImage[0].s3Urls[0];
//         }



//         let updateData = {remainderType:category, remainderName: remainder_name, subject : subject , expirationDate: expiration_date, expirationTime : expiration_time , 
//             remainderInterval : interval, emailList : email_lists, ownerEmail : owner,template: template, notes : notes , enabledisable : enable, afterexpiration: alert_after_expiration,
//             fileId:attach_file_unique_id,
//             imageUrl:imgUrl
        
//         };


//         const filter = { _id: mongoose.Types.ObjectId(remainder_id) };
//         const update = updateData;


//         let doc = await Remainder.findOneAndUpdate(filter, updateData, {
//             new: true,
//             upsert: true // Make this update into an upsert
//             });

        
//         if(doc){
//             res.status(200).json({"msg":"saved successfully"});
//         }

//     }catch(err){
//         //  console.log(err);
//          res.status(400).send(err);

//     }
    
    
// });




module.exports = router;