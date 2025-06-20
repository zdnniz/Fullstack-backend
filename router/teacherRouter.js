import express from "express";

import { createTeacher, getAllTeachers, getTeacherSettings, loginTeacher, getOneTeacher, countTeachers, updateTeacher, deleteTeacher } from "../controllers/teacherController.js";

const router = express.Router();

router.post('/', createTeacher);
router.get('/getall', getAllTeachers);
router.get("/settings", getTeacherSettings);
router.post("/login", loginTeacher); 
router.get("/search", getOneTeacher);
router.get("/count", countTeachers);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);


export default router;
 
