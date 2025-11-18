class UserModel {
  static async createUser(db, user) {
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [
      user.name,
      user.email,
      user.password,
      user.role,
    ]);
    return result;
  }

  static async findByEmail(db, email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  static async findById(db, id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  static async findAnyAdmin(db) {
    const [rows] = await db.execute(
      "SELECT id FROM users WHERE role = 'admin' LIMIT 1"
    );
    return rows.length > 0;
  }

  static async listUsers(db, limit = 50) {
    const limitNumber = parseInt(limit, 10); // ensure it's integer
    if (isNaN(limitNumber) || limitNumber <= 0) limitNumber = 50;

    // Instead of using parameter placeholder, embed the number directly
    const sql = `SELECT id, name, email, role FROM users ORDER BY id DESC LIMIT ${limitNumber}`;
    const [rows] = await db.execute(sql);
    return rows;
  }

  static async countByRole(db, role) {
    const [rows] = await db.execute(
      "SELECT COUNT(*) AS count FROM users WHERE role = ?",
      [role]
    );
    return rows[0].count;
  }
}

export default UserModel;
