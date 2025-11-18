import db from "../config/db.js";
import UserModel from "../models/User.js";

export const createUserByAdmin = async (req, res) => {
  // reuse register controller logic with req.user (but simpler)
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "Invalid input" });

    // Prevent non-admin creating admins (should be enforced by adminOnly middleware)
    if (role === "admin" && req.user.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // call UserModel.createUser after hashing in authController or repeat here
    // For simplicity, delegate to auth controller logic by calling hash here:
    const bcrypt = await import("bcryptjs");
    const hashed = await bcrypt.hash(password, 10);

    await UserModel.createUser(db, { name, email, password: hashed, role });
    res.status(201).json({ message: "User created by admin", role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await UserModel.listUsers(db, 100);
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const stats = async (req, res) => {
  try {
    const students = await UserModel.countByRole(db, "student");
    const instructors = await UserModel.countByRole(db, "instructor");
    const admins = await UserModel.countByRole(db, "admin");
    res.json({ students, instructors, admins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/admin/users?limit=5
export const getUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    console.log("Fetching users with limit:", limit); // debug

    const users = await UserModel.listUsers(db, limit);
    console.log("Users fetched:", users); // debug

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // show exact error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Example for stats endpoint
export const getStats = async (req, res) => {
  try {
    const totalStudents = await UserModel.countByRole(db, "student");
    const totalInstructors = await UserModel.countByRole(db, "instructor");
    const totalAdmins = await UserModel.countByRole(db, "admin");
    res.json({ totalStudents, totalInstructors, totalAdmins });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll(); // adjust for your DB
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
