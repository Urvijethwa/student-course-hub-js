import { layoutView } from "./layoutView.js";

export function mailingListView(interests) {
  const interestRows = interests.map((interest) => {
    return `
      <tr>
        <td>${interest.studentName}</td>
        <td>${interest.email}</td>
        <td>${interest.programmeTitle}</td>
        <td>${interest.createdAt}</td>
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