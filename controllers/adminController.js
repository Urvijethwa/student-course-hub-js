import { adminProgrammeListView } from "../views/adminProgrammeListView.js";

import {
  createProgramme,
  getAllProgrammes,
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