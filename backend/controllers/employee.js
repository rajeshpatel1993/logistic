const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

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






module.exports = router;