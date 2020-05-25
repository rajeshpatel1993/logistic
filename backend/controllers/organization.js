const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {Organization} = require("../models/organization");
const ObjectId = mongoose.Types.ObjectId;

router.get("/", async(req,res)=>{
    try{
        let organizationData = await Organization.findOne().select("organizationLogo  organizationName logobase64");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = organizationData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});






module.exports = router;