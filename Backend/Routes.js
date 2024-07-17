// routes.js
import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Users, EmployeHireForm } from "./Models.js";
const router = express.Router();
mongoose
  .connect("mongodb://localhost:27017/Interniship_task")
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((e) => {
    console.error(e);
  });

// Utility function to hash password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Could not hash the password");
  }
};

// Register route
router.post("/register", async (req, res) => {
  const { Username, email, password, role } = req.body;
  try {
    if (!Username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = new Users({ Username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "Successfully Registered!" });
  } catch (error) {
    console.error("Error saving user to database:", error);
    res.status(500).json({ message: "Registration failed!" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch && user.role === role) {
      req.session.userId = user._id;
      req.session.role = user.role;
      req.session.cookie.maxAge = 1000 * 60 * 30; // 2 minutes
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

// Middleware for authentication
function isAuthenticated(req, res, next) {
  console.log("isAuthenticated middleware:", req.session);
  if (req.session.userId) {
    return next();
  } else {
    return res.status(401).json({ message: "Please log in" });
  }
}

function hasRole(role) {
  return (req, res, next) => {
    console.log("hasRole middleware:", req.session);
    if (req.session.role === role) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  };
}

// Protected routes
router.get("/hr", isAuthenticated, hasRole("hr"), (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome, HR pages guys be free to be whom you are" });
});

router.get("/manager", isAuthenticated, hasRole("manager"), (req, res) => {
  res.status(200).json({
    message: "Welcome, Manager pages guys be free to be whom you are",
  });
});

router.get(
  "/normalUser",
  isAuthenticated,
  hasRole("normalUser"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome, Normal pages guys be free to be whom you are",
    });
  }
);

// Employee registration route
router.post("/registerEmploye", async (req, res) => {
  const { email } = req.body;
  try {
    const findEmail = await EmployeHireForm.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newEmployee = new EmployeHireForm(req.body);
    await newEmployee.save();
    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all employees
router.get("/getEmploye", async (req, res) => {
  try {
    const employees = await EmployeHireForm.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete employee by ID
router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeHireForm.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee terminated successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update employee by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      bonus,
      punishment,
      Firstname,
      middlename,
      Lastname,
      email,
      Role,
      PhoneNumber,
    } = req.body;

    const existingUser = await EmployeHireForm.findOne({ email });

    // If the email exists and does not belong to the current user
    if (existingUser && existingUser._id.toString() !== id) {
      console.log("Email already exists. Updating other elements only.");
      // Update all fields except the email
      const employee = await EmployeHireForm.findByIdAndUpdate(
        id,
        {
          bonus,
          punishment,
          Firstname,
          middlename,
          Lastname,
          Role,
          PhoneNumber,
        },
        { new: true }
      );
      res.status(200).json(employee);
    } else {
      // If the email does not exist or belongs to the current user
      const employee = await EmployeHireForm.findByIdAndUpdate(
        id,
        {
          bonus,
          punishment,
          Firstname,
          middlename,
          Lastname,
          email,
          Role,
          PhoneNumber,
        },
        { new: true }
      );
      res.status(200).json(employee);
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
