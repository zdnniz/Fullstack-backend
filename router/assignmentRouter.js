import express from "express";
import { createAssignment, getAllAssignments, countAssignments } from "../controllers/assignmentController.js";


const router = express.Router();

router.post("/", createAssignment);
router.get("/getall", getAllAssignments);
router.get("/count", countAssignments);

export default router;
