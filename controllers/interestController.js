// controllers/interestController.js
// This controller handles student interest registration and withdrawal.

import { getProgrammeById } from "../models/programmeModel.js";

import {
  createInterest,
  deleteInterest,
} from "../models/interestModel.js";

import {
  interestFormView,
  interestSuccessView,
} from "../views/interestFormView.js";

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function validateInterest(studentName, email) {
  if (!studentName || !email) {
    return "Please complete all fields.";
  }

  if (studentName.length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (!email.includes("@") || !email.includes(".")) {
    return "Please enter a valid email address.";
  }

  return "";
}

export function showInterestForm(programmeId) {
  const programme = getProgrammeById(programmeId);

  if (!programme) {
    return "<h1>Programme not found</h1>";
  }

  return interestFormView(programme);
}

export async function createInterestFromRequest(request) {
  const formData = await request.formData();

  const studentName = formData.get("studentName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const programmeId = Number(formData.get("programmeId"));

  const programme = getProgrammeById(programmeId);

  if (!programme) {
    return htmlResponse("<h1>Programme not found</h1>", 404);
  }

  const validationError = validateInterest(studentName, email);

  if (validationError) {
    return htmlResponse(
      interestFormView(programme, validationError),
      400,
    );
  }

  const interestId = createInterest(
    studentName,
    email,
    programmeId,
  );

  return htmlResponse(
    interestSuccessView(interestId),
  );
}

export function withdrawInterest(id) {
  deleteInterest(id);

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/programmes",
    },
  });
}