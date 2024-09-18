const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,  
    unique: true,   
  },
  mobile: {
    type: String,
    required: true,
    
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'],  
    required: true
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true
  },
  course: {
    type: [String],
    enum: ['MCA', 'BCA', 'BSC'],  
    default: []
  },
  profileImage: {
    type: String,
    required: false 
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
