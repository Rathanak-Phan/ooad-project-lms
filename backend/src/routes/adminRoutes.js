// routes/adminRoutes.js
import express from "express";
import {
  createUserByAdmin,
  getUsers,
  getStats,
  toggleUserStatus,
  deleteUser,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { adminOnly } from "../middlewares/adminOnly.js";

const router = express.Router();

// All admin routes protected
router.use(verifyToken, adminOnly);

router.post("/create-user", createUserByAdmin);
router.get("/users", getUsers);
router.get("/stats", getStats);

// New: Admin actions
router.patch("/user/:id/toggle", toggleUserStatus);
router.delete("/user/:id", deleteUser);

export default router;