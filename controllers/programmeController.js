// controllers/programmeController.js
// This controller handles programme-related requests.
// For now, data is hardcoded. Later, we will replace this with SQLite database data.

import { programmesView } from "../views/programmesView.js";

const programmes = [
  {
    id: 1,
    title: "Computer Science BSc",
    level: "Undergraduate",
    description: "Learn programming, databases, web development, and software engineering.",
  },
  {
    id: 2,
    title: "Cyber Security MSc",
    level: "Postgraduate",
    description: "Study ethical hacking, network security, digital forensics, and secure systems.",
  },
  {
    id: 3,
    title: "Software Engineering BSc",
    level: "Undergraduate",
    description: "Build reliable software systems using modern development methods.",
  },
];

export function showProgrammes() {
  return programmesView(programmes);
}