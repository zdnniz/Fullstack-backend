import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  teacher: {
    type: String, 
    required: true
  },
  students: [{
    type: String 
  }]
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
