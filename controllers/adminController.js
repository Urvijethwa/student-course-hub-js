import { adminProgrammeListView } from "../views/adminProgrammeListView.js";
import { editProgrammeView } from "../views/editProgrammeView.js";
import { getAllInterestsWithProgrammes } from "../models/interestModel.js";
import { mailingListView } from "../views/mailingListView.js";

import {
  createProgramme,
  getAllProgrammes,
  getProgrammeById,
  updateProgramme,
  deleteProgramme,
  toggleProgrammePublishStatus,
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

export function deleteProgrammeFromRequest(id) {

  deleteProgramme(id);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/admin/programmes",
    },
  });

}

export function toggleProgrammePublish(id) {

  toggleProgrammePublishStatus(id);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/admin/programmes",
    },
  });

}

export function showMailingList() {
  const interests = getAllInterestsWithProgrammes();

  return mailingListView(interests);
}

export function exportMailingListCsv() {

  const interests = getAllInterestsWithProgrammes();

  let csv =
    "Student Name,Email,Programme,Date Registered\n";

  for (const interest of interests) {

    csv +=
      `"${interest.studentName}",` +
      `"${interest.email}",` +
      `"${interest.programmeTitle}",` +
      `"${interest.createdAt}"\n`;

  }

  return new Response(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv",
      "content-disposition":
        "attachment; filename=mailing-list.csv",
    },
  });

}