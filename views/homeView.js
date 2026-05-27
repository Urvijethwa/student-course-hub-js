// views/homeView.js
// This file creates the homepage content.
// It uses the shared layoutView so the page has the same header and structure.

import { layoutView } from "./layoutView.js";

export function homeView() {
  const content = `
    <section class="card">
      <h2>Welcome</h2>
      <p>
        This web application helps prospective students explore university programmes,
        view course details, and register their interest.
      </p>

      <a class="button" href="/programmes">View Programmes</a>
    </section>

    <section class="card">
      <h2>Project Purpose</h2>
      <p>
        The system is designed for the Student Course Hub scenario.
        It includes student-facing pages, admin management, data persistence,
        authentication, validation, and accessibility features.
      </p>
    </section>
  `;

  return layoutView("Home", content);
}