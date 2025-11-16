// middleware/auth.js
export function verifyInstructor(req, res, next) {
    if (req.user && req.user.role === 'instructor') next();
    else res.status(403).json({ message: 'Only instructors allowed' });
}

export function verifyStudent(req, res, next) {
    if (req.user && req.user.role === 'student') next();
    else res.status(403).json({ message: 'Only students allowed' });
}
