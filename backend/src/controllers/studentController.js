// src/controllers/studentController.js
import db from "../config/db.js";

// Get logged-in student info
export const getMe = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [results] = await db.query(
      "SELECT id, name, email, role FROM users WHERE id = ? AND role = 'student'",
      [user_id]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get enrolled courses
export const getCourses = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [results] = await db.query(
      `SELECT c.id, c.title, c.description
       FROM courses c 
       JOIN enrollments e ON c.id = e.course_id 
       WHERE e.user_id = ?`,
      [user_id]
    );

    res.json(results);
  } catch (err) {
    console.error("getCourses error:", err);
    if (err.code === "ER_NO_SUCH_TABLE") {
      res.json([]); // Return empty if table missing (safe)
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// Get all assignments
export const getAssignments = async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT id, title, due_date FROM assignments"
    );
    res.json(results);
  } catch (err) {
    console.error("getAssignments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get quizzes
export const getQuizzes = async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, title FROM quizzes");
    res.json(results);
  } catch (err) {
    console.error("getQuizzes error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add these back at the bottom of studentController.js
export const submitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user.id;

    await db.query(
      "INSERT INTO submissions (user_id, assignment_id, content) VALUES (?, ?, ?)",
      [user_id, id, content]
    );

    res.json({ message: "Assignment submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submit failed" });
  }
};

export const submitQuiz = async (req, res) => {
  // same async version as before
  res.status(501).json({ message: "Not implemented yet" });
};
