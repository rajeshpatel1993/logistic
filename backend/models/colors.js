const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema ({
    colorId: {
        type: Number
    },
    name:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const Color = mongoose.model("Color", colorSchema, 'color');
exports.Color = Color;