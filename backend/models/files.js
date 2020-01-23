const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema ({
    fileId: {
        type: String
    },
    filetype:{
        type:String
    },
    s3Urls: {
        type: []
    },
    createdDate: {
        type: Date,
        default: Date.now

    }


});


const File = mongoose.model("File", fileSchema, 'files');
exports.File = File;