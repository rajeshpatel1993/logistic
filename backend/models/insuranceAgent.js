const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema ({
    insuranceCompanyId: {
        type: Number
    },
    insuranceCompanyName:{
        type:String
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const Agent = mongoose.model("Agent", agentSchema, 'insuranceCompany');
exports.Agent = Agent;