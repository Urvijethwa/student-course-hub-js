import { db } from "../db/database.js";

export function createModule(programmeId, moduleName, moduleLeader, year) {
  db.query(
    `
    INSERT INTO modules (
      programme_id,
      title,
      leader,
      year
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      programmeId,
      moduleName,
      moduleLeader,
      year,
    ],
  );
}