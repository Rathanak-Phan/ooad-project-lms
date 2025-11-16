import express from "express";
import {
  createAssignment,
  createQuiz,
  addQuizQuestion,
  createCourse,
  getInstructorAssignments,
  getInstructorQuizzes,
  getCourseCount
} from "../controllers/instructorController.js";

import { verifyInstructor } from "../middlewares/auth.js"; 
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Data
router.post("/assignment", authMiddleware, verifyInstructor, createAssignment);
router.post("/quiz", authMiddleware, verifyInstructor, createQuiz);
router.post("/quiz/:quizId/question", authMiddleware, verifyInstructor, addQuizQuestion);
router.post("/courses", authMiddleware, verifyInstructor, createCourse);

// Fetch Data
router.get("/assignments", authMiddleware, verifyInstructor, getInstructorAssignments);
router.get("/quizzes", authMiddleware, verifyInstructor, getInstructorQuizzes);
router.get("/courses/count", authMiddleware, verifyInstructor, getCourseCount);

export default router;
