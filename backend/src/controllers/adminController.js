// controllers/adminController.js

import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";
import db from "../config/db.js";

// 1. Create User (Admin only)
export const createUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["student", "instructor", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Only super admin can create another admin (optional extra security)
    if (role === "admin" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create admins" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await UserModel.createUser(db, { name, email, password: hashed, role });

    res.status(201).json({ message: "User created successfully", role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2. Get Stats
export const getStats = async (req, res) => {
  try {
    const [students, instructors, admins] = await Promise.all([
      UserModel.countByRole(db, "student"),
      UserModel.countByRole(db, "instructor"),
      UserModel.countByRole(db, "admin"),
    ]);

    const total = students + instructors + admins;

    res.json({ students, instructors, admins, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 3. Get Users (with limit)
export const getUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const users = await UserModel.listUsers(db, limit);
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 4. Toggle Disable User
export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(db, id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(403).json({ message: "Cannot disable admin" });

    await UserModel.updateUser(db, id, { disabled: !user.disabled });
    res.json({ message: "User status updated", disabled: !user.disabled });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 5. Permanently Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(db, id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(403).json({ message: "Cannot delete admin" });

    await UserModel.deleteUser(db, id);
    res.json({ message: "User deleted permanently" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};