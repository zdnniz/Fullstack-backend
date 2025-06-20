import { Student } from "../models/studentSchema.js";

export const createStudent = async (req, res, next) => {
  console.log(req.body);
  const { name, age, grade, email } = req.body;
  try {
   if (!name || !age || !grade || !email) {
    return next("Please Fill Full Form!", 400);
  }
  await Student.create({ name, age, grade, email });
  res.status(200).json({
    success: true,
    message: "Student Created!",
  });   
} catch (err) {
  console.error("Error adding student:", err);
  return res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
}
};

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('assignments')
  res.status(200).json({
    success: true,
    students,
  });   
} catch (err) {
  next(err);
}
};

export const loginStudent = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.studentId = student._id;

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    next(err);
  }
};

export const getStudentProfile = async (req, res, next) => {
  try {
    const studentId = req.session.studentId;
    console.log("student id:", studentId);
    if (!studentId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ student });
  } catch (err) {
    next(err);
  }
};

export const getOneStudent = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const student = await Student.findOne({ name }).populate('assignments');

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ success: true, student });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const countStudents = async (req, res) => {
  try {
    const count = await Student.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error counting students", error: err.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, grade, email } = req.body;

  try {
    const updated = await Student.findByIdAndUpdate(id, { name, age, grade, email }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ success: true, student: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ success: true, message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
