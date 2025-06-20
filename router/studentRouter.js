import express from "express";
import { getAllStudents, createStudent, loginStudent, getStudentProfile, getOneStudent, countStudents, updateStudent, deleteStudent } from "../controllers/studentController.js";

const router = express.Router();

router.get('/getall', getAllStudents);
router.post('/', createStudent);
router.post("/login", loginStudent);
router.get("/settings", getStudentProfile);
router.get("/search", getOneStudent);
router.get("/count", countStudents);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);

export default router;


