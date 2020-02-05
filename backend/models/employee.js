const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema ({
    employeeCode: {
        type: String
    },
    title:{
        type:String
    },
    role:{
        type:String
    },
    firstName: {
        type: String
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    }
   


}, { timestamps: true });


const Employee = mongoose.model("Employee", employeeSchema, 'employees');
exports.Employee = Employee;