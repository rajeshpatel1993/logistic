const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {remainderType} = require("../models/remainderType");

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


module.exports = router;