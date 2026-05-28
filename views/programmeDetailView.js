import { layoutView } from "./layoutView.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function programmeDetailView(programme, modules) {
  const moduleList = modules.map((module) => {
    return `
      <li class="module-item">
        <strong>
          Year ${escapeHtml(module.year)}:
        </strong>

        ${escapeHtml(module.title)}

        <p class="module-leader">
          Module Leader:
          ${escapeHtml(module.leader)}
        </p>
      </li>
    `;
  }).join("");

  const noModulesMessage =
    modules.length === 0
      ? `<p class="muted-text">No modules have been added yet.</p>`
      : "";

  const content = `
    <section class="card programme-detail-card">

      <a
        class="back-link"
        href="/programmes"
      >
        ← Back to programmes
      </a>

      ${programme.image
        ? `
          <img
            class="programme-detail-image"
            src="${escapeHtml(programme.image)}"
            alt="${escapeHtml(programme.title)}"
          >
        `
        : ""}

      <h2>
        ${escapeHtml(programme.title)}
      </h2>

      <p class="tag">
        ${escapeHtml(programme.level)}
      </p>

      <p class="programme-description">
        ${escapeHtml(programme.description)}
      </p>

      <div class="register-wrapper">
        <a
          class="button register-button"
          href="/interests/new?programmeId=${programme.id}"
        >
          Register Interest
        </a>
      </div>

      <h3>Modules</h3>

      ${noModulesMessage}

      <ul class="module-list">
        ${moduleList}
      </ul>

    </section>
  `;

  return layoutView(
    programme.title,
    content,
  );
}