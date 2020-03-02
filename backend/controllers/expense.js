const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const moment = require('moment');

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


router.get("/expensetypebyexpenseid/:expenseId", async (req, res) => {
    const id = req.params.expenseId; //or use req.param('id')
    console.log(id);
    const filter = { _id: mongoose.Types.ObjectId(id) };
    let vehicleExpenseData = await ExpenseType.findOne(filter);
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


function getLastMonths(n) {
    var m =['January','February','March','April','May','June','July','August','September','October','November','December'];
    var last_n_months =[]
    var d = new Date()
    for(var i=0;i<n;i++){
      last_n_months[i] = m[d.getMonth()];
      d.setMonth(d.getMonth()-1)
    }
    return last_n_months
}



router.get("/vehicle_expenses_by_vehicle",async(req,res) => {
    const resPerPage = 2; // results per page
    const page = parseInt(req.query.page) || 1; // Page 
    const skipd = (resPerPage * page) - resPerPage;
    let noofitems;
    try {

        const nooitemsAggregate = await Expense.aggregate([
            {$match: {"isDeleted":0}},
            {$group: {_id: "$vehicle"}},
            {$count : "noofitems"}
        ]);

        if(nooitemsAggregate.length > 0){
            nooitems = nooitemsAggregate[0].noofitems;
        }else{
            nooitems = 0;

        }

       
        const pager = paginate(nooitems, page,resPerPage);

        const vehiclesIds = await Expense.aggregate([
            {$match: {"isDeleted":0}},
            {
                $group:{
                    _id: "$vehicle",
                    expense_dates: { $push: "$createdAt" } ,
                    expense_types_ids: {$push:"$expense_type"},
                    descriptions: {$push: "$details"},
                    amounts: {$push: "$amount"},
                    vendors: {$push: "$vendor"},
                    totalAmount: {$sum:{"$toDouble":"$amount"}}

                }
            },
            
            // {
            //     $lookup:{
                    
            //         "from": "expenseType",
            //         "foreignField": "_id",
            //         "localField": "expense_types_ids",
            //         "as": "expenseTypes"
            //     }
            // },
            {
                $lookup:{
                    
                    "from": "vehicle",
                    "let": { "vehId": "$_id" },
                    "pipeline": [
                        { "$match": { "$expr": { "$eq": ["$_id", "$$vehId"]}}},
                        { "$project": { "vehicleStatusId": 1, "name": 1 , "vehicle_code":1, "vehicleImage":1,}}
                      ],
                      "as": "vehicleDetail"
                }
            },
            {   $unwind:"$vehicleDetail" },     // $unwind used for getting data in object or for one record only

            {
                $lookup:{
                    
                    "from": "vehicleStatus",
                    "let": { "vehId": "$vehicleDetail.vehicleStatusId" },
                    "pipeline": [
                        { "$match": { "$expr": { "$eq": ["$vehicleStatusId", "$$vehId"] }}},
                        { "$project": { "vehicleStatusId": 1, "vehicleStatus": 1 }}
                      ],
                      "as": "vehicleStatus"

                }
            },

            {   $unwind:"$vehicleStatus" },     // $unwind used for getting data in object or for one record only



             
        // {
        //     $skip: skipd
        // },
        // {
        //     $limit:resPerPage
        // }
       
        ]);
        // let expenseData = await Expense.find({"isDeleted": 0}).populate('issue_status').populate('vehicle').populate('vehicleType').populate('expense_type').skip(skipd).limit(resPerPage);
        let responseData = {};
        responseData["status"] = 200;
        responseData["page"] = pager;
        responseData["data"] = vehiclesIds;
        res.status(200).json(responseData);
    } catch (error) {
        console.log(error);
    }
});

router.post("/vehicleExpensesbyVehicle", async (req, res) => {
    let {vehicleId, startDate,endDate} = req.body;
    // let vehicleId = req.params.vehicleId;
    let filter;
    if(startDate && endDate){

        filter = {$and: [{ vehicle:  mongoose.Types.ObjectId(vehicleId)},{"isDeleted":0}, {"createdAt" : 
        {
            "$gte" : new Date(startDate), 
            "$lt" : new Date(endDate) 
        }}] };
        
    }else{
        filter = {$and: [{ vehicle:  mongoose.Types.ObjectId(vehicleId)},{"isDeleted":0}] };
    }
 

    try{
    let expenseData = await Expense.aggregate([
        {
            $match: filter
        }
        ,
        { 
            $group: { 
                _id: "$expense_type", 
                total: { 
                    $sum: {"$toDouble":"$amount" }
                } 
            } 
        },

        { "$lookup": {
            "from": "expenseType",
            "localField": "_id",
            "foreignField": "_id",
            "as": "expensesTypes"
       }},
       { "$unwind": { "path" : "$expensesTypes" } },

        
    ]);

        let responseData = {};
        responseData["status"] = 200;
        responseData["data"] = expenseData;
        res.status(200).json(responseData);
        
    }catch(error){
        console.log(error);
    }
   

    
});



router.get("/vehicleExpensesbyMonth/:vehicleExpenseType", async (req, res) => {
    let monthsort = moment.monthsShort();
    let currMonth = moment().format('M');
    let last5months = getLastMonths(5);
    let expenseTypeId = req.params.vehicleExpenseType;
    console.log(expenseTypeId);
    // let startmomentmonth = getMonthDateRange(2019,'December');
    let startdatearr = [];
    let enddatearr = [];
    for(let i=0;i<=5;i++){
        let startofmonth = new moment().startOf('month');
        let enofmonth = new moment().endOf("month");
        startdatearr.push(startofmonth.subtract(i,'months').toISOString());
        enddatearr.push(enofmonth.subtract(i,'months').toISOString());

    }

    var finalData = [];

    for(let i=0;i<5;i++){
        let tmpMonthdata = {};
        let filterdata = {$and:[{"expense_date":{$gte:startdatearr[i], $lte:enddatearr[i]}}, {"expense_type":mongoose.Types.ObjectId(expenseTypeId)}]};
        let expenseData = await Expense.find(filterdata, {"amount":1});

        let totalAmountByMonth = 0;
        for(let i=0;i<expenseData.length;i++){
            totalAmountByMonth = parseInt(totalAmountByMonth) + parseInt(expenseData[i]['amount']);
        }
        finalData.push(totalAmountByMonth);
    }


   
    let responseData = {};
    responseData["status"] = 200;
    responseData["data"] = finalData;
    res.status(200).json(responseData);
    
});






module.exports = router;