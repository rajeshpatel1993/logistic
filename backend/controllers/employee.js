const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const paginate = require('jw-paginate');

const {Employee} = require("../models/employee");


router.get("/", async(req,res)=>{
    try{
        let employeeData = await Employee.find().select("firstName  middleName lastName");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = employeeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});



router.get("/emp_list", async(req,res)=>{
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;


    try{
            // const nooitems = await Employee.countDocuments({"isDeleted": +0});
            const nooitems = await Employee.countDocuments();
            const pager = paginate(nooitems, page,resPerPage);
    
           let notedata = await Employee.aggregate([
               
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

    }catch(error){
        console.log(error);
    }
});






module.exports = router;