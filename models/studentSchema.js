import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  grade: {
    type: String,
    required: true
  },
  age:{
    type:String,
    required:true
  },
  assignments: [{  
    type: String,
    //required: true
  }]
});


export const Student = mongoose.model('Student', studentSchema);



