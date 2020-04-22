const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema ({
    vehicle:{type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    reported_date: {type: String, required: true},
    reported_time: {type: String, required: true},
    reportedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    assignTo: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee'},
    summary: {type: String, required: true},
    description: {type: String, required: true},
    odometer: {type: String, required: true},

    priority: {type: mongoose.Schema.Types.ObjectId, ref: 'PriorityStatus'},
    notify_assignee: {type: Boolean, default: true},
    status: {type: mongoose.Schema.Types.ObjectId, ref: 'VehicleIssueStatus'},
    note: {type: String},
    image_file_unique_id: {type: String},
    bill_file_unique_id: {type: String},
    imageUrl: {type: []},
    billUrl: {type: []},
    isDeleted: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const Issue = mongoose.model("Issue", issueSchema, 'issues');
exports.Issue = Issue;