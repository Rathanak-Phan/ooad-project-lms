import db from "../config/db.js";

// Get logged-in student info
export const getMe = (req, res) => {
  const user_id = req.user.id;

  db.query(
    "SELECT id, name, email, role FROM users WHERE id = ? AND role = 'student'",
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(404).json({ message: "Student not found" });

      res.json(results[0]);
    }
  );
};

// Get enrolled courses
export const getCourses = (req, res) => {
  const user_id = req.user.id;

  db.query(
    `SELECT c.id, c.title 
     FROM courses c 
     JOIN enrollments e ON c.id = e.course_id 
     WHERE e.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

// Get all assignments
export const getAssignments = (req, res) => {
  db.query("SELECT * FROM assignments", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Get quizzes
export const getQuizzes = (req, res) => {
  db.query("SELECT * FROM quizzes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Submit assignment
export const submitAssignment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const user_id = req.user.id;

  db.query(
    "INSERT INTO submissions (user_id, assignment_id, content) VALUES (?, ?, ?)",
    [user_id, id, content],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Assignment submitted" });
    }
  );
};

// Submit quiz
export const submitQuiz = (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM quiz_questions WHERE quiz_id = ?",
    [id],
    (err, questions) => {
      if (err) return res.status(500).json(err);

      let score = 0;

      questions.forEach((q) => {
        if (answers[q.id] === q.answer) score++;
      });

      db.query(
        "INSERT INTO submissions (user_id, quiz_id, content, score) VALUES (?, ?, ?, ?)",
        [user_id, id, JSON.stringify(answers), score],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          res.json({ message: "Quiz submitted", score });
        }
      );
    }
  );
};
