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

  const content = `
    <section class="card programme-detail-card">

      <a
        class="back-link"
        href="/programmes"
      >
        ← Back to programmes
      </a>

      <h2>
        ${escapeHtml(programme.title)}
      </h2>

      <p class="tag">
        ${escapeHtml(programme.level)}
      </p>

      <p class="programme-description">
        ${escapeHtml(programme.description)}
      </p>

      <h3>Modules</h3>

      <ul class="module-list">
        ${moduleList}
      </ul>

      <div class="button-group">

        <a
          class="button action-button"
          href="/interests/new?programmeId=${programme.id}"
        >
          Register Interest
        </a>

      </div>

    </section>
  `;

  return layoutView(
    programme.title,
    content,
  );

}