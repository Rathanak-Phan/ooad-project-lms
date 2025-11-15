class CourseModel {
  static async create(db, course) {
    const sql = `INSERT INTO courses (title, description, instructor_id, video_path, thumbnail_path) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [
      course.title,
      course.description,
      course.instructor_id,
      course.video_path,
      course.thumbnail_path
    ]);
    return result;
  }

  static async findById(db, id) {
    const [rows] = await db.execute(
      `SELECT c.*, u.name as instructor_name 
       FROM courses c 
       JOIN users u ON c.instructor_id = u.id 
       WHERE c.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findAll(db) {
    const [rows] = await db.execute(
      `SELECT c.*, u.name as instructor_name 
       FROM courses c 
       JOIN users u ON c.instructor_id = u.id 
       ORDER BY c.created_at DESC`
    );
    return rows;
  }

  static async update(db, id, courseData) {
    const sql = `UPDATE courses SET title=?, description=?, video_path=?, thumbnail_path=? WHERE id=?`;
    const [result] = await db.execute(sql, [
      courseData.title,
      courseData.description,
      courseData.video_path,
      courseData.thumbnail_path,
      id
    ]);
    return result;
  }

  static async delete(db, id) {
    const [result] = await db.execute(`DELETE FROM courses WHERE id=?`, [id]);
    return result;
  }
}

export default CourseModel;
