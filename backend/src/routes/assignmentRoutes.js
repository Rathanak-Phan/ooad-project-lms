// routes/assignmentRoutes.js
import express from "express";
const router = express.Router();

// POST: Create assignment
router.post("/instructor/assignments", (req, res) => {
  const { title, description, due_date } = req.body;

  if (!title || !description || !due_date) {
    return res.status(400).json({ message: "All fields required" });
  }

  console.log("📌 Assignment received:", req.body);

  return res.status(201).json({
    message: "Assignment created successfully!",
    assignment: { title, description, due_date },
  });
});

// GET: All assignments (for dashboard)
router.get("/instructor/assignments", (req, res) => {
  return res.json([
    { id: 1, title: "Test Assignment A" },
    { id: 2, title: "Test Assignment B" }
  ]);
});

export default router;
