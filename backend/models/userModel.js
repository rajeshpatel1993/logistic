const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: { type: String, required: true, unique: true, immutable: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    designation: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true },    
    profilePic: { type: String },
    created_at: { type: Date, default: Date.now, immutable: true },
    updated_at: { type: Date },
    organizationId: { type: String, required: true }
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;