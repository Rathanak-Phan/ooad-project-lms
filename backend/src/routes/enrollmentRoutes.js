import express from "express";
import { enroll, unenroll, listEnrollments } from "../controllers/enrollmentController.js";
import { verifyToken, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, verifyRole(["student"]), enroll);
router.delete("/:course_id", verifyToken, verifyRole(["student"]), unenroll);
router.get("/", verifyToken, verifyRole(["student"]), listEnrollments);

export default router;
