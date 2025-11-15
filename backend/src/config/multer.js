import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // e.g. course-<timestamp>-originalname.mp4
    const ext = path.extname(file.originalname);
    const name = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, name);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 * 2 }, // 2GB limit adjust as needed
  fileFilter: (req, file, cb) => {
    // only allow video files (basic)
    const allowed = /mp4|mov|avi|mkv|webm/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  }
});
