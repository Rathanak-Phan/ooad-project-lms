import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  instructorId: String,
  courseId: String,
  title: String,
  description: String,
  deadline: Date,
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
