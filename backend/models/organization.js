const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema ({
    organizationName: {
       type: String 
    },
    organizationFullName: {
        type: String
    },
    organizationEmail:{
        type:String
    },

    organizationPh: {
        type: String 
     },
     organizationAddress: {
         type: String
     },
     organizationLogo:{
         type:String
     },
     themeColor:{
        type:String
    },

    creatorId:{
        type:String,
        default: "1"
    }


}, { timestamps: true });


const Organization = mongoose.model("Organization", organizationSchema, 'organizations');
exports.Organization = Organization;