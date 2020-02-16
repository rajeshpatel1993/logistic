const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const {File} = require("../models/files");
const {ExpenseType} = require("../models/expenseType");
const {VehicleIssueStatus} = require("../models/vehicleIssueStatus");
const {Expense} = require("../models/expense");
const paginate = require('jw-paginate');

router.get("/types", async(req,res)=>{
    try{
        let expenseTypeData = await ExpenseType.find().select("expenseType");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = expenseTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});

router.get("/vehicleIssueStatus", async(req,res)=>{
    try{
        let issueTypeData = await VehicleIssueStatus.find().select("vehicleIssueStatus");
        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = issueTypeData;
        res.status(200).json(responseData);

    }catch(error){
        console.log(error);
    }
});


router.post("/deleteExpense", async (req, res) => {
    try{

        let {id} = req.body;
        const filter = { _id: mongoose.Types.ObjectId(id) };
        const update = { "isDeleted": 1 };
        let updateExpenses = await Expense.findOneAndUpdate(filter, update);
        res.status(200).json({"msg":"deleted successfully"});
        // console.log(updateVehicle);

    }catch(error){
        console.log(error);
    }
});




router.post("/update-expense/:expenseId", async (req, res)=> {
    let expenseID = req.params.expenseId;
    try{
        // console.log(req.body);
        let filesurls = [];
        let imageurls = [];
        let {vehicle_type, vehicle, expense_type,expense_date, vendor, 
            details, amount, issue_status, attachments, images, note} = req.body;
    
        let serviceFiles = await File.find({fileId:attachments }).select("s3Urls");
        if(serviceFiles.length > 0){
            filesurls = serviceFiles[0].s3Urls; 
        }

        let imageFiles = await File.find({fileId:images }).select("s3Urls");
        // console.log(imageFiles);
        if(imageFiles.length > 0){
            imageurls = imageFiles[0].s3Urls; 
        }


        const query = {"_id":expenseID};

        
        const update = {
            expense_date: expense_date,
            vendor : vendor , 
            details:details,
            amount:amount,
            attachments : filesurls , images : imageurls,
            note: note
       
       };

        if(vehicle_type && typeof vehicle_type != "string"){
            update["vehicleType"] = vehicle_type._id;
        }

        if(vehicle && typeof vehicle != "string"){
            update["vehicle"] = vehicle.id;
        }

        if(expense_type && typeof expense_type != "string"){
            update["expense_type"] = expense_type.id;
        }

        if(issue_status && typeof issue_status != "string"){
            update["issue_status"] = issue_status.id;
        }

        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        let saveData = await Expense.findOneAndUpdate(query, update, options);
        if(saveData){
            res.status(200).json({"msg":"saved successfully"});
        }


    }catch(err){
        console.log(err);
    }
    
    
});



router.post("/add", async (req, res)=> {
    try{
        // console.log(req.body);
        let filesurls = [];
        let imageurls = [];
        let {vehicle_type, vehicle, expense_type,expense_date, vendor, 
            details, amount, issue_status, attachments, images, note} = req.body;
    
        let serviceFiles = await File.find({fileId:attachments }).select("s3Urls");
        if(serviceFiles.length > 0){
            filesurls = serviceFiles[0].s3Urls; 
        }

        let imageFiles = await File.find({fileId:images }).select("s3Urls");
        if(imageFiles.length > 0){
            imageurls = imageFiles[0].s3Urls; 
        }


        const vehicle_expense_instance = new Expense({vehicleType:vehicle_type._id, vehicle: vehicle.id, expense_type : expense_type.id , 
            expense_date : expense_date , 
            vendor : vendor,  details:details, amount: amount,issue_status:issue_status.id, attachments : filesurls , images : imageurls,
               note: note
        
        });
        let saveData = await vehicle_expense_instance.save();
        if(saveData){
            res.status(200).json({"msg":"saved successfully"});
        }


    }catch(err){
        console.log(err);
    }
    
    
});


router.get("/vehicleExpense/:expenseId", async (req, res) => {
    const id = req.params.expenseId; //or use req.param('id')
    const filter = { _id: mongoose.Types.ObjectId(id) };
    let vehicleExpenseData = await Expense.findOne(filter).populate('vehicleType').populate('vehicle').populate('expense_type').populate('issue_status');
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = vehicleExpenseData;
    res.status(200).json(responseData);
    
});




router.get("/vehicle_expenses",async(req,res) => {
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    try {
        const nooitems = await Expense.countDocuments();
        const pager = paginate(nooitems, page,resPerPage);
        let expenseData = await Expense.find({"isDeleted": 0}).populate('issue_status').populate('vehicle').populate('vehicleType').populate('expense_type').skip(skipd).limit(resPerPage);
        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = expenseData;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});








module.exports = router;