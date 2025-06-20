import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createTeacher = async (req, res, next) => {
  console.log(req.body);
  const { name, email, subject } = req.body;
  try {
    if (!name || !email || !subject) {
      handleValidationError("Please Fill Full Form!", 400);
    }
    await Teacher.create({ name, email, subject });
    res.status(200).json({
      success: true,
      message: "Teacher Created!",
    });
  } catch (err) {
    next(err)
  }
};

export const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err)
  }
};

export const getTeacherSettings = async (req, res) => {
  try {
    const teacherId = req.session.teacherId;

    if (!teacherId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ teacher });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginTeacher = async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.teacherId = teacher._id;
  console.log("Session after login:", req.session);
  res.status(200).json({ message: "Login successful" });
};


export const getOneTeacher = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ success: true, teacher });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const countTeachers = async (req, res) => {
  try {
    const count = await Teacher.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error counting teachers", error: err.message });
  }
};

export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, subject } = req.body;

  try {
    const updated = await Teacher.findByIdAndUpdate(id, { name, email, subject }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ success: true, teacher: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Teacher.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ success: true, message: "Teacher deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

