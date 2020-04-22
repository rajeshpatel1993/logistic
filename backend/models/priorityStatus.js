const mongoose = require('mongoose');

const priorityStatusSchema = new mongoose.Schema ({
    priorityStatusId: {
        type: Number
    },
    priorityStatus:{
        type: String,
        required: true,
    },

    priorityColor:{
        type:String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const PriorityStatus = mongoose.model("PriorityStatus", priorityStatusSchema, 'priorityStatus');
exports.PriorityStatus = PriorityStatus;