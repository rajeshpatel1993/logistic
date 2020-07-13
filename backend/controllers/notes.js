const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {Notes} =  require("../models/notes");
const {Vehicle} = require("../models/vehicle");
const paginate = require('jw-paginate');

const config = require("../config/config");
const paginationSize = parseInt(config['app'].pagination_size);

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


router.get("/filterNote", async(req,res)=>{
   
    let matchCondition = [];
    let vehicleType = req.query.vehicleType;
    let vehicleDetail = req.query.vehicleDetail;
    let vehicleReg = req.query.vehicleReg;
    let noteData;

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
        const nooitemsAggregate = await Notes.aggregate([
            {$match: {$and: matchCondition}},
            {$count : "noofitems"}
        ]);

        if(nooitemsAggregate.length > 0){
            nooitems = nooitemsAggregate[0].noofitems;
        }else{
            nooitems = 0;

        }
         pager = paginate(nooitems, page,resPerPage);


         noteData = await Notes.aggregate([{
    
            $match: {$and: matchCondition}
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
            ,
            
            {
                $skip: skipd
            },
            {
                $limit:resPerPage
            }
           
        
        ]);



    }else{
        nooitems = await Notes.countDocuments({"isDeleted": 0});
        pager = paginate(nooitems, page,resPerPage);


        noteData = await Notes.aggregate([{
    
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
            ,
            
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
        responseData["data"] = noteData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});

router.post("/deleteNote", async (req, res) => {
    try{

        let {id} = req.body;
        const filter = { _id: mongoose.Types.ObjectId(id) };
        const update = { isDeleted: 1 };
        let updateNote = await Notes.findOneAndUpdate(filter, update);
        res.status(200).json({"msg":"saved successfully"});
        // console.log(updateVehicle);

    }catch(error){
        console.log(error);
    }
});


router.post("/add", async (req, res)=> {
    // let {asset} = req.body;
    try{

      let  {vehicle, note} = req.body;
      let vehicleDat = await Vehicle.findOne({"_id":mongoose.Types.ObjectId(vehicle.id)});
      let savedata = {vehicle:vehicle.id,vehicleForSearch:vehicleDat, note:note};
    
        try{
            const note_instance = new Notes(savedata);
            let sData = await note_instance.save();
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
           
    
            const nooitems = await Notes.countDocuments({"isDeleted": +0});

            const pager = paginate(nooitems, page,resPerPage);
    
           let notedata = await Notes.aggregate([{
    
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
            ,
            
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
            responseData["data"] = notedata;
            res.status(200).json(responseData);
        } catch (error) {
            console.log(error);
        }
});



router.get("/getNote/:id", async (req, res) => {
    const id = req.params.id; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    const noteData = await Notes.aggregate([{$match:filter},
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
       
    
    ]);
    
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = noteData;
    res.status(200).json(responseData);
    


});


router.post("/updateNote", async (req, res)=> {
    try{

        let  {vehicle, note, noteId} = req.body;
          
        const filter = { _id: mongoose.Types.ObjectId(noteId) };
        const updateData = {"note":note};


        let doc = await Notes.findOneAndUpdate(filter, updateData, {
            new: true,
            upsert: true // Make this update into an upsert
            });

        
        if(doc){
            res.status(200).json({"msg":"saved successfully"});
        }


      
      
       
       
          // res.status(200).json(req.body);
      }catch(err){
          // res.status(400).send(err);
          console.log(err);
      }
      
    
    
});




module.exports = router;