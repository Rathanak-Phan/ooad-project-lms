import express from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

// Public register: will default to student, but if first admin, can create admin
router.post("/register", verifyTokenOptional, register); // we'll define optional below
router.post("/login", login);

// helper to allow optional token parsing
function verifyTokenOptional(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return next();
  const token = header.split(" ")[1];
  try {
    const jwt = require("jsonwebtoken");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
  } catch (err) {
    // ignore invalid token, treat as anonymous
  }
  next();
}

export default router;
