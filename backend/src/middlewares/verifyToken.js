import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/User.js";
import db from "../config/db.js";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header || !header.startsWith("Bearer ")) return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(db, payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = { id: user.id, role: user.role, name: user.name, email: user.email };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
