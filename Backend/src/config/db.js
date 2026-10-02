require("dotenv").config();
const mysql = require("mysql2");

// Connection details come from Backend/.env (never commit that file)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  ssl: { rejectUnauthorized: false },
  connectionLimit: 5,
});

// Create the tables on startup if they don't exist yet, so a fresh database works with no setup
const createTables = async () => {
  await db.promise().query(`
    CREATE TABLE IF NOT EXISTS event_responses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_email VARCHAR(255),
      event_name TEXT,
      event_type TEXT,
      event_date TEXT,
      event_length TEXT,
      guest_count TEXT,
      location TEXT,
      catering TEXT,
      theme TEXT,
      entertainment TEXT,
      budget TEXT,
      accommodations TEXT,
      special_requests TEXT,
      event_timeline TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await db.promise().query(`
    CREATE TABLE IF NOT EXISTS guests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      event_id INT,
      name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(50),
      status VARCHAR(50) DEFAULT 'Pending'
    )
  `);
};

createTables()
  .then(() => console.log("Connected to MySQL Database!"))
  .catch((err) => console.error("Database connection failed:", err));

module.exports = db;

/**
 * This module creates a MySQL connection pool using the `mysql2` package.
 * Credentials are read from environment variables (DB_HOST, DB_USER, DB_PASSWORD,
 * DB_NAME, DB_PORT) set in Backend/.env locally, so no secrets live in the code.
 *
 * A pool is used instead of a single connection because the backend runs as a
 * serverless function on Vercel, where a single long-lived connection can drop.
 * Pools support the same `db.query(...)` and `db.promise().query(...)` calls.
 *
 * On startup, `createTables()` creates the `event_responses` and `guests` tables
 * if they are missing, so a brand-new database needs no manual setup.
 */
