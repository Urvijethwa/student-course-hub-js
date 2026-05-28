import { layoutView } from "./layoutView.js";

export function adminDashboardView() {

  const content = `
    <section class="card">

      <h2>
        Admin Dashboard
      </h2>

      <p>
        You are logged in and authorised
        to access admin features.
      </p>

      <div class="admin-actions">

        <a
          class="button dashboard-button"
          href="/admin/programmes/new"
        >
          Add Programme
        </a>

        <a
          class="button dashboard-button"
          href="/admin/programmes"
        >
          Manage Programmes
        </a>

        <a
          class="button dashboard-button"
          href="/admin/interests"
        >
          View Mailing List
        </a>

        <a
          class="button dashboard-button"
          href="/admin/interests/export"
        >
          Export CSV
        </a>

      </div>

      <div class="admin-info">

        <h3>
          Admin Features
        </h3>

        <ul>
          <li>Manage programmes</li>
          <li>Add and edit modules</li>
          <li>View interested students</li>
          <li>Download CSV mailing list</li>
          <li>Publish and unpublish programmes</li>
        </ul>

      </div>

      <a
        class="button logout-button"
        href="/logout"
      >
        Logout
      </a>

    </section>
  `;

  return layoutView(
    "Admin Dashboard",
    content,
  );

}