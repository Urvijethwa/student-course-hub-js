import { adminProgrammeListView } from "../views/adminProgrammeListView.js";
import { editProgrammeView } from "../views/editProgrammeView.js";
import { getAllInterestsWithProgrammes } from "../models/interestModel.js";
import { mailingListView } from "../views/mailingListView.js";
import { addProgrammeView } from "../views/addProgrammeView.js";

import {
  createProgramme,
  getAllProgrammes,
  getProgrammeById,
  updateProgramme,
  deleteProgramme,
  toggleProgrammePublishStatus,
} from "../models/programmeModel.js";

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function validateProgramme(title, level, description) {
  if (!title || !level || !description) {
    return "Please complete all fields.";
  }

  if (title.length < 3) {
    return "Programme title must be at least 3 characters.";
  }

  if (description.length < 20) {
    return "Description must be at least 20 characters.";
  }

  if (level !== "Undergraduate" && level !== "Postgraduate") {
    return "Please select a valid programme level.";
  }

  return "";
}

export function showAddProgrammePage() {
  return addProgrammeView();
}

export async function createProgrammeFromRequest(request) {
  const formData = await request.formData();

  const title = formData.get("title")?.toString().trim();
  const level = formData.get("level")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  const validationError = validateProgramme(title, level, description);

  if (validationError) {
    return htmlResponse(addProgrammeView(validationError), 400);
  }

  createProgramme(title, level, description);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/admin/programmes",
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

export async function updateProgrammeFromRequest(request, id) {
  const formData = await request.formData();

  const title = formData.get("title")?.toString().trim();
  const level = formData.get("level")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  const validationError = validateProgramme(title, level, description);

  if (validationError) {
    return htmlResponse(
      editProgrammeView(
        {
          id,
          title,
          level,
          description,
        },
        validationError,
      ),
      400,
    );
  }

  updateProgramme(id, title, level, description);

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

  let csv = "Student Name,Email,Programme,Date Registered\n";

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
      "content-disposition": "attachment; filename=mailing-list.csv",
    },
  });
}