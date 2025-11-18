// src/routes/studentRoute.js
import express from "express";
import {
  getMe,
  getCourses,
  getAssignments,
  getQuizzes,
  // remove submitAssignment & submitQuiz for now
} from "../controllers/studentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/courses", authMiddleware, getCourses);
router.get("/assignments", authMiddleware, getAssignments);
router.get("/quizzes", authMiddleware, getQuizzes);

// Comment these until you add the functions back
// router.post("/assignments/:id/submit", authMiddleware, submitAssignment);
// router.post("/quizzes/:id/submit", authMiddleware, submitQuiz);

export default router;
