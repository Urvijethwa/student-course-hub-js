// views/programmeDetailView.js
// This view displays one programme and its related modules.

import { layoutView } from "./layoutView.js";

export function programmeDetailView(programme, modules) {
  const moduleList = modules.map((module) => {
    return `
      <li class="module-item">
        <strong>Year ${module.year}:</strong> ${module.title}
        <br>
        <span>Module leader: ${module.leader}</span>
      </li>
    `;
  }).join("");

  const content = `
    <section class="card">
      <a href="/programmes">← Back to programmes</a>

      <h2>${programme.title}</h2>
      <p class="tag">${programme.level}</p>
      <p>${programme.description}</p>

      <h3>Modules</h3>
      <ul class="module-list">
        ${moduleList}
      </ul>

      <a class="button" href="/interests/new?programmeId=${programme.id}">
        Register Interest
      </a>
    </section>
  `;

  return layoutView(programme.title, content);
}