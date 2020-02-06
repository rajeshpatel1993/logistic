const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema ({
    projectId: {
       type: String 
    },
    projectName: {
        type: String
    },
    projectTypeId:{
        type:String
    },
    creatorId:{
        type:String,
        default: "1"
    }


}, { timestamps: true });


const Project = mongoose.model("Project", projectSchema, 'projects');
exports.Project = Project;