const express = require("express");
const router = express.Router();
const {Vehicle} = require("../models/vehicle");
const {VehicleType} = require("../models/vechileType");
const {VehicleDetail} = require("../models/vehicleDetail");
const paginate = require('jw-paginate');

router.post("/add", async (req, res)=> {
// let {asset} = req.body;
try{
   

    let {service_code, msg} = req.body;

    // if(msg.status == 400){
    //     let serviceCode = service_code.split("x");
    //     let typeofrequest = serviceCode[0];
    //     let processId = serviceCode[1];
    //     let processIdkey = "processid_"+processId;
    //     let tmpObj = {};
    //     if(processIdkey in errorArr){
    //         errorArr[processIdkey].push(req.body);

    //     }else{
    //         errorArr[processIdkey] = [];
    //         errorArr[processIdkey].push(req.body);
    //     }
       
    //     let pingData = new Ping({ping_type:typeofrequest,process:{process_id:processId},msg})
    //     let saveData = await pingData.save();
    // }
    res.status(200).json({"msg":"saved successfully"});
}catch(err){
    console.log(err);
}


});

router.get("/types", async(req,res)=>{
    try{
        let vehicleTypeData = await VehicleType.find().select("vehicleTypeId , vehicleType , vehicleTypeCode");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/details", async(req,res)=>{
    try{
        let vehicleDetailsData = await VehicleDetail.find().select("vehicleDetailsId , vehicleDetails");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleDetailsData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/regnos", async(req,res)=>{
    try{
        let regData = await Vehicle.find().distinct('regNo');
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = regData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.get("/",async(req,res) => {
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    try {
       

        const nooitems = await Vehicle.count();

         // get pager object for specified page
         const pager = paginate(nooitems, page,resPerPage);


       let vehicleData = await Vehicle.aggregate([ {
            $lookup: {
                from: "vehicleDetails", // collection to join
                let: { "vechDetId": "$vehicleDetailsId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleDetailsId", "$$vechDetId"] }}},
                    { "$project": { "vehicleDetails": 1, "_id": 0 }}
                ],
                as: "vehicleDetailsArray"// output array field
            }
        }, {
            $lookup: {
                from: "vehicleStatus", // from collection name
                let: { "vechStatusId": "$vehicleStatusId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$vehicleStatusId", "$$vechStatusId"] }}},
                    { "$project": { "vehicleStatus": 1, "_id": 0 }}
                ],
                as: "vehicleStatusArray"
            }
        },
        {
            $lookup: {
                from: "worklocation", // from collection name
                let: { "worklocid": "$workLocationId" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$workLocationId", "$$worklocid"] }}},
                    { "$project": { "workLocation": 1, "_id": 0 }}
                ],
                as: "workLocationArray"
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
        responseData["data"] = vehicleData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;