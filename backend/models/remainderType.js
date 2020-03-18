const mongoose = require('mongoose');

const remainderTypeSchema = new mongoose.Schema ({
    name:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const remainderType = mongoose.model("remainderType", remainderTypeSchema, 'remainderType');
exports.remainderType = remainderType;