const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema ({
    vehicle:{type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
    vehicleForSearch: {type: Object, required: true},

    note:{
        type: String
    },
    isDeleted: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const Notes = mongoose.model("Notes", notesSchema, 'notes');
exports.Notes = Notes;