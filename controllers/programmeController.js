// controllers/programmeController.js
// This controller handles programme-related requests.
// It asks the model for data, then passes that data to the view.

import { getPublishedProgrammes } from "../models/programmeModel.js";
import { programmesView } from "../views/programmesView.js";

export function showProgrammes() {
  // Get programme data from SQLite through the model.
  const programmes = getPublishedProgrammes();

  // Send programme data to the view to generate HTML.
  return programmesView(programmes);
}