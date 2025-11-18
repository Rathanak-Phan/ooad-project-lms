import express from "express";
import { createUserByAdmin, listUsers, stats } from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js"; 
import { adminOnly } from "../middlewares/adminOnly.js";     
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/authMiddleware.js";
import { getUsers, getStats, getActivities } from "../controllers/adminController.js";

const router = express.Router();

// Protect all admin routes
router.use(verifyToken, adminOnly);

// Admin routes
router.post("/create-user", createUserByAdmin);
router.get("/users", listUsers);
router.get("/stats", stats);

router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.get("/stats", authMiddleware, adminMiddleware, getStats);
router.get("/activities", authMiddleware, adminMiddleware, getActivities);

export default router;
