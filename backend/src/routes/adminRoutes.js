import express from "express";
import { createUserByAdmin, listUsers, stats } from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js"; // matches your folder "middlewares"
import { adminOnly } from "../middlewares/adminOnly.js";     // also plural

const router = express.Router();

// Protect all admin routes
router.use(verifyToken, adminOnly);

// Admin routes
router.post("/create-user", createUserByAdmin);
router.get("/users", listUsers);
router.get("/stats", stats);

export default router;
