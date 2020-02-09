const mongoose = require('mongoose');

const expenseTypeSchema = new mongoose.Schema ({
    expenseTypeId: {
        type: String
    },
    expenseType:{
        type:String
    },
    createdDate:{
        type: String,
        // default: Date.now
    },
    creatorId: {
        type: String

    },

    organizationId: {
        type: String

    },
    



});


const ExpenseType = mongoose.model("ExpenseType", expenseTypeSchema, 'expenseType');
exports.ExpenseType = ExpenseType;