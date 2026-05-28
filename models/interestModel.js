// models/interestModel.js
// This model handles interest registration database queries.

import { db } from "../db/database.js";

export function createInterest(studentName, email, programmeId) {
  // Parameterised query prevents SQL injection.
  db.query(
    `
    INSERT INTO interests (
      student_name,
      email,
      programme_id
    )
    VALUES (?, ?, ?)
    `,
    [
      studentName,
      email,
      programmeId,
    ],
  );

  // Return the ID of the new interest record.
  const row = [...db.query("SELECT last_insert_rowid()")][0];

  return row[0];
}

export function getAllInterestsWithProgrammes() {
  const rows = db.query(
    `
    SELECT
      interests.id,
      interests.student_name,
      interests.email,
      interests.created_at,
      programmes.title
    FROM interests
    JOIN programmes
      ON interests.programme_id = programmes.id
    ORDER BY interests.created_at DESC
    `,
  );

  return [...rows].map((row) => {
    return {
      id: row[0],
      studentName: row[1],
      email: row[2],
      createdAt: row[3],
      programmeTitle: row[4],
    };
  });
}

export function deleteInterest(id) {
  db.query(
    `
    DELETE FROM interests
    WHERE id = ?
    `,
    [id],
  );
}