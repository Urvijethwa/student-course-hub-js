// views/programmeDetailView.js
// This view displays one programme and its related modules.

import { layoutView } from "./layoutView.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function programmeDetailView(programme, modules) {
  const moduleList = modules.map((module) => {
    return `
      <li class="module-item">
      <strong>Year ${escapeHtml(module.year)}:</strong> ${escapeHtml(module.title)}
      <span>Module leader: ${escapeHtml(module.leader)}</span>
      </li>
    `;
  }).join("");

  const content = `
    <section class="card">
      <a href="/programmes">← Back to programmes</a>

      <h2>${escapeHtml(programme.title)}</h2>
      <p class="tag">${escapeHtml(programme.level)}</p>
      <p>${escapeHtml(programme.description)}</p>

      <h3>Modules</h3>
      <ul class="module-list">
        ${moduleList}
      </ul>

      <a class="button" href="/interests/new?programmeId=${programme.id}">
        Register Interest
      </a>

      <form
      method="POST"
      action="/interests/${programme.id}/withdraw"
    >

      <button
        class="button danger-button"
        type="submit"
      >
        Withdraw Interest
      </button>

    </form>
    </section>
  `;

  return layoutView(programme.title, content);
}