// models/userModel.js
import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});
const EmployeeSchema = new mongoose.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  birthdates: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  bonus: {
    type: Number,
  },
  punishment: {
    type: Number,
  },
});

const EmployeHireForm = mongoose.model("Employee", EmployeeSchema);
const Users = mongoose.model("Register", RegisterSchema);

export { EmployeHireForm, Users };
