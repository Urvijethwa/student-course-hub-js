// db/database.js
// This file creates and connects to the SQLite database.
// It also creates the required tables if they do not already exist.

import { DB } from "https://deno.land/x/sqlite/mod.ts";

// Open the SQLite database file.
// If the file does not exist, SQLite will create it automatically.
export const db = new DB("student_course_hub.db");

// Create the programmes table.
// This stores the course/programme information shown to students.
db.execute(`
  CREATE TABLE IF NOT EXISTS programmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    description TEXT NOT NULL,
    published INTEGER NOT NULL DEFAULT 1
  )
`);

// Insert sample programme data only if the table is empty.
const programmeCount = [...db.query("SELECT COUNT(*) FROM programmes")][0][0];

if (programmeCount === 0) {
  db.query(
    "INSERT INTO programmes (title, level, description, published) VALUES (?, ?, ?, ?)",
    [
      "Computer Science BSc",
      "Undergraduate",
      "Learn programming, databases, web development, and software engineering.",
      1,
    ],
  );

  db.query(
    "INSERT INTO programmes (title, level, description, published) VALUES (?, ?, ?, ?)",
    [
      "Cyber Security MSc",
      "Postgraduate",
      "Study ethical hacking, network security, digital forensics, and secure systems.",
      1,
    ],
  );

  db.query(
    "INSERT INTO programmes (title, level, description, published) VALUES (?, ?, ?, ?)",
    [
      "Software Engineering BSc",
      "Undergraduate",
      "Build reliable software systems using modern development methods.",
      1,
    ],
  );
}