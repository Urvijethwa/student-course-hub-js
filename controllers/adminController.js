import { adminProgrammeListView } from "../views/adminProgrammeListView.js";
import { editProgrammeView } from "../views/editProgrammeView.js";

import {
  createProgramme,
  getAllProgrammes,
  getProgrammeById,
  updateProgramme,
} from "../models/programmeModel.js";

import { addProgrammeView } from "../views/addProgrammeView.js";

export function showAddProgrammePage() {
  return addProgrammeView();
}

export async function createProgrammeFromRequest(request) {

  const formData = await request.formData();

  const title = formData.get("title")?.toString().trim();
  const level = formData.get("level")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  // Basic validation.
  if (!title || !level || !description) {
    return addProgrammeView("Please complete all fields.");
  }

  // Save programme into database.
  createProgramme(title, level, description);

  // Redirect back to admin dashboard.
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/admin",
    },
  });

}

export function showAdminProgrammes() {
  const programmes = getAllProgrammes();

  return adminProgrammeListView(programmes);
}

export function showEditProgrammePage(id) {

  const programme = getProgrammeById(id);

  if (!programme) {
    return "<h1>Programme not found</h1>";
  }

  return editProgrammeView(programme);

}
export async function updateProgrammeFromRequest(
  request,
  id,
) {

  const formData = await request.formData();

  const title = formData.get("title")?.toString().trim();

  const level = formData.get("level")?.toString().trim();

  const description =
    formData.get("description")?.toString().trim();

  if (!title || !level || !description) {
    return editProgrammeView(
      {
        id,
        title,
        level,
        description,
      },
      "Please complete all fields.",
    );
  }

  updateProgramme(
    id,
    title,
    level,
    description,
  );

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/admin/programmes",
    },
  });

}