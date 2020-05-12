const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {Notes} =  require("../models/notes");
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
        let savedata = {vehicle:vehicle.id,note:note};
    
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
        const resPerPage = 2; // results per page
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