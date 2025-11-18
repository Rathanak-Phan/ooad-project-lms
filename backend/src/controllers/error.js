import UserModel from "../models/UserModel.js";
import db from "../config/db.js";

export const getUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    console.log("Fetching users with limit:", limit);

    const users = await UserModel.listUsers(db, limit);
    console.log("Users fetched:", users);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error); // ← This shows the exact MySQL error
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
