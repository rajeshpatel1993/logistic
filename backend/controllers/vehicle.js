const express = require("express");
const router = express.Router();
const {Vehicle} = require("../models/vehicle");
router.post("/", async (req, res)=> {
// let {asset} = req.body;
try{
   

    let {service_code, msg} = req.body;
    if(msg.status == 400){
        let serviceCode = service_code.split("x");
        let typeofrequest = serviceCode[0];
        let processId = serviceCode[1];
        let processIdkey = "processid_"+processId;
        let tmpObj = {};
        if(processIdkey in errorArr){
            errorArr[processIdkey].push(req.body);

        }else{
            errorArr[processIdkey] = [];
            errorArr[processIdkey].push(req.body);
        }
       
        let pingData = new Ping({ping_type:typeofrequest,process:{process_id:processId},msg})
        let saveData = await pingData.save();
    }
    res.status(200).json({"msg":"saved successfully"});
}catch(err){
    console.log(err);
}


});

router.get("/",async(req,res) => {
    try {

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
        }
    
    ]);

        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = vehicleData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;