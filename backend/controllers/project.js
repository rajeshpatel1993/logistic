const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {Project} = require("../models/project");
const {ProjectType} = require("../models/projectType");
const ObjectId = mongoose.Types.ObjectId;

router.get("/projecttypes", async(req,res)=>{
    try{
        let projectTypeData = await ProjectType.find().select("projectTypeId  projectTypeName");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = projectTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/:projectTypeId", async(req,res)=>{
    let projectTypeId = req.params.projectTypeId;
    try{
        let projectData = await Project.find({"_id" : ObjectId(projectTypeId)}).select("projectId  projectName");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = projectData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});








module.exports = router;