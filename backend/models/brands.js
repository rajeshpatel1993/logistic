const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema ({
    brandId: {
        type: Number
    },
    brand:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const Brand = mongoose.model("Brand", brandSchema, 'brand');
exports.Brand = Brand;