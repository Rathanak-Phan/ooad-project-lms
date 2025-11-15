class UserModel {
  static async createUser(db, user) {
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [
      user.name,
      user.email,
      user.password,
      user.role
    ]);
    return result;
  }

  static async findByEmail(db, email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email
    ]);
    return rows[0]; 
  }
}

export default UserModel;
