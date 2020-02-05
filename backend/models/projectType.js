const mongoose = require('mongoose');

const projectTypeSchema = new mongoose.Schema ({
    projectTypeId: {
        type: String
    },
    projectTypeName:{
        type:String
    },
    projectTypeCode:{
        type:String
    },
    workLocation_id: {
        type: String
    },
    creatorId: {
        type: String
    },
    organizationId: {
        type: String
    }
   


}, {timestamps: true});


const ProjectType = mongoose.model("ProjectType", projectTypeSchema, 'projecttype');
exports.ProjectType = ProjectType;