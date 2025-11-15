import db from "./db.js"; // ✔ correct import with .js extension

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("✅ Database connected! Test query result:", rows);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    db.end(); // close pool
  }
}

testConnection();
