const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema ({
    modelId: {
        type: Number
    },
    model:{
        type:String
    },
    brandId:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const Model = mongoose.model("Model", modelSchema, 'model');
exports.Model = Model;