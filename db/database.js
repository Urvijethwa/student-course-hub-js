// db/database.js
// This file creates and connects to the SQLite database.
// It also creates the required tables if they do not already exist.

import { DB } from "https://deno.land/x/sqlite/mod.ts";

// Open the SQLite database file.
// If the file does not exist, SQLite will create it automatically.
export const db = new DB("student_course_hub.db");

// Create programmes table.
db.execute(`
  CREATE TABLE IF NOT EXISTS programmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    description TEXT NOT NULL,
    published INTEGER NOT NULL DEFAULT 1
  )
`);

// Create modules table.
// Each module belongs to one programme using programme_id.
db.execute(`
  CREATE TABLE IF NOT EXISTS modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    programme_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    leader TEXT NOT NULL,
    FOREIGN KEY (programme_id) REFERENCES programmes(id)
  )
`);

// Insert sample programmes only if table is empty.
const programmeCount = [...db.query("SELECT COUNT(*) FROM programmes")][0][0];

if (programmeCount === 0) {
  db.query(
    "INSERT INTO programmes (title, level, description, published) VALUES (?, ?, ?, ?)",
    ["Computer Science BSc", "Undergraduate", "Learn programming, databases, web development, and software engineering.", 1],
  );

  db.query(
    "INSERT INTO programmes (title, level, description, published) VALUES (?, ?, ?, ?)",
    ["Cyber Security MSc", "Postgraduate", "Study ethical hacking, network security, digital forensics, and secure systems.", 1],
  );

  db.query(
    "INSERT INTO programmes (title, level, description, published) VALUES (?, ?, ?, ?)",
    ["Software Engineering BSc", "Undergraduate", "Build reliable software systems using modern development methods.", 1],
  );
}

// Insert sample modules only if modules table is empty.
const moduleCount = [...db.query("SELECT COUNT(*) FROM modules")][0][0];

if (moduleCount === 0) {
  db.query("INSERT INTO modules (programme_id, title, year, leader) VALUES (?, ?, ?, ?)", [1, "Web Development", 1, "Dr Smith"]);
  db.query("INSERT INTO modules (programme_id, title, year, leader) VALUES (?, ?, ?, ?)", [1, "Database Systems", 2, "Dr Patel"]);
  db.query("INSERT INTO modules (programme_id, title, year, leader) VALUES (?, ?, ?, ?)", [1, "Final Year Project", 3, "Dr Brown"]);

  db.query("INSERT INTO modules (programme_id, title, year, leader) VALUES (?, ?, ?, ?)", [2, "Network Security", 1, "Dr Khan"]);
  db.query("INSERT INTO modules (programme_id, title, year, leader) VALUES (?, ?, ?, ?)", [2, "Digital Forensics", 2, "Dr Wilson"]);

  db.query("INSERT INTO modules (programme_id, title, year, leader) VALUES (?, ?, ?, ?)", [3, "Software Design", 1, "Dr Green"]);
  db.query("INSERT INTO modules (programme_id, title, year, leader) VALUES (?, ?, ?, ?)", [3, "Agile Development", 2, "Dr Taylor"]);
}

// Create interests table.
// This stores prospective students who register interest in a programme.
db.execute(`
  CREATE TABLE IF NOT EXISTS interests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    programme_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (programme_id) REFERENCES programmes(id)
  )
`);