// views/programmesView.js
// This view renders the list of available programmes as HTML cards.

import { layoutView } from "./layoutView.js";

export function programmesView(programmes) {
  // Convert each programme object into an HTML card.
  const programmeCards = programmes.map((programme) => {
    return `
      <article class="card programme-card">
        <h3>${programme.title}</h3>
        <p class="tag">${programme.level}</p>
        <p>${programme.description}</p>
        <a class="button" href="/programmes/${programme.id}">View Details</a>
      </article>
    `;
  }).join("");

  const content = `
    <section>
      <h2>Available Programmes</h2>
      <p>Browse undergraduate and postgraduate programmes.</p>

      <div class="grid">
        ${programmeCards}
      </div>
    </section>
  `;

  return layoutView("Programmes", content);
}