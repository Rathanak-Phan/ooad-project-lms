// controllers/studentController.js
import db from '../db.js';

export const getAssignments = (req, res) => {
    db.query("SELECT * FROM assignments", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

export const getQuizzes = (req, res) => {
    db.query("SELECT * FROM quizzes", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

export const submitAssignment = (req, res) => {
    const { id } = req.params; // assignment id
    const { content } = req.body;
    const user_id = req.user.id;

    db.query(
        "INSERT INTO submissions (user_id, assignment_id, content) VALUES (?, ?, ?)",
        [user_id, id, content],
        (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Assignment submitted' });
        }
    );
};

export const submitQuiz = async (req, res) => {
    const { id } = req.params; // quiz id
    const { answers } = req.body; // { questionId: "A", ... }
    const user_id = req.user.id;

    db.query(
        "SELECT * FROM quiz_questions WHERE quiz_id = ?",
        [id],
        (err, questions) => {
            if (err) return res.status(500).json(err);

            let score = 0;
            questions.forEach(q => {
                if (answers[q.id] === q.answer) score++;
            });

            db.query(
                "INSERT INTO submissions (user_id, quiz_id, content, score) VALUES (?, ?, ?, ?)",
                [user_id, id, JSON.stringify(answers), score],
                (err2) => {
                    if (err2) return res.status(500).json(err2);
                    res.json({ message: 'Quiz submitted', score });
                }
            );
        }
    );
};
