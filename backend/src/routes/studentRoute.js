import express from "express";
import {
    getMe,
    getCourses,
    getAssignments,
    getQuizzes,
    submitAssignment,
    submitQuiz
} from "../controllers/studentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/courses", authMiddleware, getCourses);
router.get("/assignments", authMiddleware, getAssignments);
router.get("/quizzes", authMiddleware, getQuizzes);

router.post("/assignments/:id/submit", authMiddleware, submitAssignment);
router.post("/quizzes/:id/submit", authMiddleware, submitQuiz);

export default router;
