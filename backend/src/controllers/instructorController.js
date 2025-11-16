import db from "../config/db.js";

// CREATE Assignment
export const createAssignment = async (req, res) => {
  const { title, description, due_date } = req.body;
  const instructor_id = req.user.id;

  try {
    const [result] = await db.query(
      "INSERT INTO assignments (title, description, due_date, instructor_id) VALUES (?, ?, ?, ?)",
      [title, description, due_date, instructor_id]
    );

    res.json({ message: "Assignment created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE Quiz
export const createQuiz = async (req, res) => {
  const { title, description } = req.body;
  const instructor_id = req.user.id;

  try {
    const [result] = await db.query(
      "INSERT INTO quizzes (title, description, instructor_id) VALUES (?, ?, ?)",
      [title, description, instructor_id]
    );

    res.json({ message: "Quiz created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ADD Quiz Question
export const addQuizQuestion = async (req, res) => {
  const { quizId } = req.params;
  const { question, options, answer } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO quiz_questions (quiz_id, question, options, answer) VALUES (?, ?, ?, ?)",
      [quizId, question, JSON.stringify(options), answer]
    );

    res.json({ message: "Question added", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create course
export const createCourse = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO courses (title, description, instructor_id) VALUES (?, ?, ?)",
      [title, description, req.user.id] // Make sure req.user.id exists
    );

    res.status(201).json({ id: result.insertId, title, description });
  } catch (err) {
    console.error("Create Course Error:", err); // ✅ log the full error
    res.status(500).json({ message: "Failed to create course" });
  }
};

// GET Assignments
export const getInstructorAssignments = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const [rows] = await db.query(
      `SELECT id, title, description, due_date 
       FROM assignments 
       WHERE instructor_id = ? 
       ORDER BY id DESC`,
      [instructorId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to load assignments" });
  }
};

// GET Quizzes
export const getInstructorQuizzes = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const [rows] = await db.query(
      `SELECT id, title, description 
       FROM quizzes 
       WHERE instructor_id = ? 
       ORDER BY id DESC`,
      [instructorId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to load quizzes" });
  }
};

// GET Course Count
export const getCourseCount = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const [rows] = await db.query(
      "SELECT COUNT(*) AS total FROM courses WHERE instructor_id = ?",
      [instructorId]
    );

    res.json({ courses: rows[0].total });
  } catch (err) {
    res.status(500).json({ error: "Failed to load course count" });
  }
};
