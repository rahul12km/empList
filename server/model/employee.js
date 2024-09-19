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
    enum: ['hr', 'manager', 'sales'],  
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  course: {
    type: [String],
    enum: ['mca', 'bca', 'bsc'],  
    default: []
  },
  profileImageURL: {
    type: String,
    required: false 
  }
},{ timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
