// models/programmeModel.js
// This model handles programme database queries.
// Models should contain database logic, not HTML.

import { db } from "../db/database.js";

export function getPublishedProgrammes() {
  // Parameterised/simple query used to get only published programmes.
  // Later, this helps demonstrate data persistence and MVC.
  const rows = db.query(
    "SELECT id, title, level, description FROM programmes WHERE published = ?",
    [1],
  );

  // Convert SQLite rows into JavaScript objects.
  return [...rows].map((row) => {
    return {
      id: row[0],
      title: row[1],
      level: row[2],
      description: row[3],
    };
  });
}