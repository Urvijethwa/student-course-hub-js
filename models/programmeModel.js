import { db } from "../db/database.js";

export function getPublishedProgrammes() {
  const rows = db.query(
    "SELECT id, title, level, description, image FROM programmes WHERE published = ?",
    [1],
  );

  return [...rows].map((row) => ({
    id: row[0],
    title: row[1],
    level: row[2],
    description: row[3],
    image: row[4],
  }));
}

export function getProgrammeById(id) {
  const rows = db.query(
    "SELECT id, title, level, description, image FROM programmes WHERE id = ? AND published = ?",
    [id, 1],
  );

  const programme = [...rows][0];

  if (!programme) return null;

  return {
    id: programme[0],
    title: programme[1],
    level: programme[2],
    description: programme[3],
    image: programme[4],
  };
}

export function getModulesByProgrammeId(programmeId) {
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

export function createProgramme(title, level, description, image) {
  db.query(
    `
    INSERT INTO programmes (
      title,
      level,
      description,
      image,
      published
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [title, level, description, image, 1],
  );
}

export function getAllProgrammes() {
  const rows = db.query(`
    SELECT id, title, level, description, image, published
    FROM programmes
    ORDER BY id DESC
  `);

  return [...rows].map((row) => ({
    id: row[0],
    title: row[1],
    level: row[2],
    description: row[3],
    image: row[4],
    published: row[5],
  }));
}

export function updateProgramme(id, title, level, description, image) {
  db.query(
    `
    UPDATE programmes
    SET title = ?,
        level = ?,
        description = ?,
        image = ?
    WHERE id = ?
    `,
    [title, level, description, image, id],
  );
}

export function deleteProgramme(id) {
  db.query("DELETE FROM modules WHERE programme_id = ?", [id]);
  db.query("DELETE FROM interests WHERE programme_id = ?", [id]);
  db.query("DELETE FROM programmes WHERE id = ?", [id]);
}

export function toggleProgrammePublishStatus(id) {
  db.query(
    `
    UPDATE programmes
    SET published =
      CASE
        WHEN published = 1 THEN 0
        ELSE 1
      END
    WHERE id = ?
    `,
    [id],
  );
}

export function searchPublishedProgrammes(searchTerm, level) {
  let sql = `
    SELECT id, title, level, description, image
    FROM programmes
    WHERE published = ?
  `;

  const params = [1];

  if (searchTerm) {
    sql += `
      AND (
        title LIKE ?
        OR description LIKE ?
      )
    `;

    params.push(`%${searchTerm}%`);
    params.push(`%${searchTerm}%`);
  }

  if (level) {
    sql += ` AND level = ? `;
    params.push(level);
  }

  sql += ` ORDER BY title ASC `;

  const rows = db.query(sql, params);

  return [...rows].map((row) => ({
    id: row[0],
    title: row[1],
    level: row[2],
    description: row[3],
    image: row[4],
  }));
}