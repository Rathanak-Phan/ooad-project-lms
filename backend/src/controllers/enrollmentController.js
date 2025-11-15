import db from "../config/db.js";

export const enroll = (req, res) => {
  const student_id = req.user.id;
  const { course_id } = req.body;

  const sql = "INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)";
  db.query(sql, [student_id, course_id], (err, result) => {
    if (err) {
      // handle unique constraint (already enrolled)
      if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Already enrolled" });
      return res.status(500).json(err);
    }
    res.json({ message: "Enrolled", enrollmentId: result.insertId });
  });
};

export const unenroll = (req, res) => {
  const student_id = req.user.id;
  const { course_id } = req.params;

  db.query("DELETE FROM enrollments WHERE student_id = ? AND course_id = ?", [student_id, course_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Unenrolled" });
  });
};

export const listEnrollments = (req, res) => {
  // For student: list their courses
  const student_id = req.user.id;
  db.query(
    `SELECT e.*, c.title, c.description, c.video_path 
     FROM enrollments e 
     JOIN courses c ON e.course_id = c.id 
     WHERE e.student_id = ?`, [student_id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};
