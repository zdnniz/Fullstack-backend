// assignmentController.js

import { Assignment } from "../models/assignmentSchema.js";
//import { handleValidationError } from "../middlewares/errorHandler.js";
//import { Teacher } from "../models/teacherSchema.js";
//import { Student } from "../models/studentSchema.js";

export const createAssignment = async (req, res, next) => {
  const { title, description, grade, deadline, teacher, students } = req.body;

  if (!title || !description || !grade || !deadline || !teacher ||  !Array.isArray(students)) {
    return res.status(400).json({ message: "Please Fill Full Form!" });
  }

  try {
    const assignment = await Assignment.create({ title, description, grade, deadline, teacher, students });
    res.status(201).json({
      success: true,
      assignment,
      message: "Assignment Created!"
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find().populate('teacher').populate('students');
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
}; 

export const countAssignments = async (req, res) => {
  try {
    const count = await Assignment.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error counting assignments", error: err.message });
  }
};