import express from "express";
import { studentSignIn, teacherSignIn } from "../controllers/usersController.js";
import { adminSignIn } from "../controllers/usersController.js";

const router = express.Router();

router.post('/student/signin', studentSignIn);
router.post('/teacher/signin', teacherSignIn);
router.post('/signin', adminSignIn);
// router.post('/admin/register', adminRegister);
//router.post('/users/signin');
//router.get('/admin/settings', getTeacherSettings);
export default router;
 
