import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Rathanak123",
  database: "e_learning_plateform",
}).promise();

export default db;
