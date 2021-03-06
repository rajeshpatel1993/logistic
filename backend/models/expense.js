const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema ({
    vehicleType:{type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType'},
    vehicle: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    vehicleForSearch: {type: Object, required: true},
    expense_type: {type: mongoose.Schema.Types.ObjectId, ref: 'ExpenseType'},
    expense_date:{
        type: Date
    },
    vendor:{
        type: String
    },
    details: {
        type: String
    },
    amount: {
        type: String
    },
    issue_status:{type: mongoose.Schema.Types.ObjectId, ref: 'VehicleIssueStatus'},
    attachments:[],
    images: [],
    isDeleted: {
        type: Number,
        default: 0
    },
    note: {
        type: String
    }
    
}, { timestamps: true });


const Expense = mongoose.model("Expense", expenseSchema, 'expenses');


exports.Expense = Expense;