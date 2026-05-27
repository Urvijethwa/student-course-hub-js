// models/userModel.js
// This model handles user-related database queries.

import { db } from "../db/database.js";

export function findUserByUsername(username) {
  // Parameterised query prevents SQL injection attacks.
  const rows = db.query(
    "SELECT id, username, password, role FROM users WHERE username = ?",
    [username],
  );

  const user = [...rows][0];

  if (!user) {
    return null;
  }

  return {
    id: user[0],
    username: user[1],
    password: user[2],
    role: user[3],
  };
}