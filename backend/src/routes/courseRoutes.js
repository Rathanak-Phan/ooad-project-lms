import express from "express";
import { createCourse, getCourse, listCourses, updateCourse, deleteCourse } from "../controllers/courseController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Public list & get
router.get("/", listCourses);
router.get("/:id", getCourse);

// Protected: instructor create (role: instructor)
router.post("/", verifyToken, verifyRole(["instructor"]), upload.single("video"), createCourse);

// Protected: instructor update / delete (in real app check instructor owns the course)
router.put("/:id", verifyToken, verifyRole(["instructor"]), upload.single("video"), updateCourse);
router.delete("/:id", verifyToken, verifyRole(["instructor","admin"]), deleteCourse);

export default router;
