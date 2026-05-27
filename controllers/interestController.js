// controllers/interestController.js
// This controller handles student interest registration.

import { getProgrammeById } from "../models/programmeModel.js";
import { createInterest } from "../models/interestModel.js";
import { interestFormView, interestSuccessView } from "../views/interestFormView.js";

export function showInterestForm(programmeId) {
  const programme = getProgrammeById(programmeId);

  if (!programme) {
    return "<h1>Programme not found</h1>";
  }

  return interestFormView(programme);
}

export async function createInterestFromRequest(request) {
  // Read form data submitted using POST.
  const formData = await request.formData();

  const studentName = formData.get("studentName")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const programmeId = Number(formData.get("programmeId"));

  const programme = getProgrammeById(programmeId);

  if (!programme) {
    return "<h1>Programme not found</h1>";
  }

  // Basic server-side validation.
  if (!studentName || !email) {
    return interestFormView(programme, "Please complete all fields.");
  }

  // Simple email validation.
  if (!email.includes("@") || !email.includes(".")) {
    return interestFormView(programme, "Please enter a valid email address.");
  }

  // Save the interest registration in SQLite.
  createInterest(studentName, email, programmeId);

  return interestSuccessView();
}