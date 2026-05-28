import { layoutView } from "./layoutView.js";
import { escapeHtml } from "../utils/escapeHtml.js";

export function mailingListView(interests) {
  const interestRows = interests.map((interest) => {
    return `
      <tr>
        <td>${escapeHtml(interest.studentName)}</td>
        <td>${escapeHtml(interest.email)}</td>
        <td>${escapeHtml(interest.programmeTitle)}</td>
        <td>${escapeHtml(interest.createdAt)}</td>
      </tr>
    `;
  }).join("");

  const content = `
    <section class="card">
      <h2>Interested Students Mailing List</h2>

      <p>
        This page shows prospective students who registered interest
        in specific programmes.
      </p>

      <a class="button" href="/admin/interests/export">
        Export CSV
      </a>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Programme</th>
              <th>Date Registered</th>
            </tr>
          </thead>

          <tbody>
            ${interestRows}
          </tbody>
        </table>
      </div>
    </section>
  `;

  return layoutView("Mailing List", content);
}