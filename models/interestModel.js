// models/interestModel.js
// This model handles interest registration database queries.

import { db } from "../db/database.js";

export function createInterest(studentName, email, programmeId) {
  // Parameterised query prevents SQL injection.
  db.query(
    "INSERT INTO interests (student_name, email, programme_id) VALUES (?, ?, ?)",
    [studentName, email, programmeId],
  );
}