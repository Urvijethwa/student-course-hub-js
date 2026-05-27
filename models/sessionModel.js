import { db } from "../db/database.js";

export function createSession(sessionToken, userId) {

  db.query(
    `
    INSERT INTO sessions (
      session_token,
      user_id
    )
    VALUES (?, ?)
    `,
    [
      sessionToken,
      userId,
    ],
  );

}

export function getSessionByToken(sessionToken) {

  const rows = db.query(
    `
    SELECT
      id,
      user_id,
      session_token
    FROM sessions
    WHERE session_token = ?
    `,
    [sessionToken],
  );

  const session = [...rows][0];

  if (!session) {
    return null;
  }

  return {
    id: session[0],
    userId: session[1],
    sessionToken: session[2],
  };

}