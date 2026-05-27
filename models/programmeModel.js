// models/programmeModel.js
// This model handles programme database queries.
// Models contain database logic only.

import { db } from "../db/database.js";

export function getPublishedProgrammes() {
  const rows = db.query(
    "SELECT id, title, level, description FROM programmes WHERE published = ?",
    [1],
  );

  return [...rows].map((row) => ({
    id: row[0],
    title: row[1],
    level: row[2],
    description: row[3],
  }));
}

export function getProgrammeById(id) {
  // Parameterised query helps protect against SQL injection.
  const rows = db.query(
    "SELECT id, title, level, description FROM programmes WHERE id = ? AND published = ?",
    [id, 1],
  );

  const programme = [...rows][0];

  if (!programme) {
    return null;
  }

  return {
    id: programme[0],
    title: programme[1],
    level: programme[2],
    description: programme[3],
  };
}

export function getModulesByProgrammeId(programmeId) {
  // Gets modules linked to a specific programme.
  const rows = db.query(
    "SELECT id, title, year, leader FROM modules WHERE programme_id = ? ORDER BY year ASC",
    [programmeId],
  );

  return [...rows].map((row) => ({
    id: row[0],
    title: row[1],
    year: row[2],
    leader: row[3],
  }));
}

export function createProgramme(title, level, description) {

  db.query(
    `
    INSERT INTO programmes (
      title,
      level,
      description,
      published
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      title,
      level,
      description,
      1,
    ],
  );

}