import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../config/db.js";
import UserModel from "../models/User.js";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existingUser = await UserModel.findByEmail(db, email);
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    // Default role student
    let assignedRole = "student";

    // If request has authenticated admin who wants to create admin
    if (req.user && req.user.role === "admin" && role === "admin") assignedRole = "admin";

    // If no admin exists, allow first admin creation
    const adminExists = await UserModel.findAnyAdmin(db);
    if (!adminExists && role === "admin") assignedRole = "admin";

    // If role explicitly set to instructor and request is admin, allow it
    if (req.user && req.user.role === "admin" && role === "instructor") assignedRole = "instructor";

    // If role is provided but request is not admin and not first admin -> ignore (keep student)
    const newUser = { name, email, password: hashed, role: assignedRole };
    await UserModel.createUser(db, newUser);

    res.status(201).json({ message: "User registered", role: assignedRole });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(db, email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login success",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
