import db from "../config/db.js";
import CourseModel from "../models/Course.js";
import fs from "fs";
import path from "path";

export const createCourse = (req, res) => {
  const { title, description } = req.body;
  const instructor_id = req.user.id;

  // file from multer: req.file (field name 'video')
  const videoFile = req.file;
  const videoPath = videoFile ? `/uploads/${videoFile.filename}` : null;

  const newCourse = { title, description, instructor_id, video_path: videoPath, thumbnail_path: null };

  CourseModel.create(db, newCourse, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Course created", courseId: result.insertId });
  });
};

export const getCourse = (req, res) => {
  const id = req.params.id;
  CourseModel.findById(db, id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json({ message: "Course not found" });
    res.json(results[0]);
  });
};

export const listCourses = (req, res) => {
  CourseModel.findAll(db, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const updateCourse = (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const videoFile = req.file;
  const videoPath = videoFile ? `/uploads/${videoFile.filename}` : null;

  const courseData = { title, description, video_path: videoPath, thumbnail_path: null };

  CourseModel.update(db, id, courseData, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Course updated" });
  });
};

export const deleteCourse = (req, res) => {
  const id = req.params.id;
  // Optionally, remove file from disk (careful: validate path)
  CourseModel.findById(db, id, (err, results) => {
    if (err) return res.status(500).json(err);
    if (!results.length) return res.status(404).json({ message: "Course not found" });

    const course = results[0];
    // remove video file if exists
    if (course.video_path) {
      const fullPath = path.join(process.cwd(), course.video_path);
      fs.unlink(fullPath, (e) => {/* ignore errors */});
    }

    CourseModel.delete(db, id, (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ message: "Course deleted" });
    });
  });
};
