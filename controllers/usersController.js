import { handleValidationError } from "../middlewares/errorHandler.js";
import {Admin } from "../models/adminRegisterSchema.js";
//import { Student } from "../models/usersSchema.js";
//import { Teacher } from "../models/usersSchema.js";

export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    /*const isPasswordValid = await existingAdmin.isValidPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }*/

    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
    });
  } catch (err) {
    console.error("Error in adminSignIn:", err);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
  }
};


export const studentSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    res.status(200).json({
      success: true,
      message: "Student signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const teacherSignIn = async (req, res, next) => { 
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};
