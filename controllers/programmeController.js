// controllers/programmeController.js
// This controller handles programme-related requests.
// It gets data from models and sends it to views.

import {
  getPublishedProgrammes,
  getProgrammeById,
  getModulesByProgrammeId,
} from "../models/programmeModel.js";

import { programmesView } from "../views/programmesView.js";
import { programmeDetailView } from "../views/programmeDetailView.js";

export function showProgrammes() {
  const programmes = getPublishedProgrammes();
  return programmesView(programmes);
}

export function showProgrammeDetails(programmeId) {
  const programme = getProgrammeById(programmeId);

  if (!programme) {
    return "<h1>Programme not found</h1>";
  }

  const modules = getModulesByProgrammeId(programmeId);

  return programmeDetailView(programme, modules);
}