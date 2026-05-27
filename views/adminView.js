import { layoutView } from "./layoutView.js";

export function adminDashboardView() {
  const content = `
    <section class="card">
      <h2>Admin Dashboard</h2>

      <p>
        You are logged in and authorised to access admin features.
      </p>

      <a class="button" href="/admin/programmes/new">
      Add New Programme
      </a>

      <ul>
        <li>Manage programmes</li>
        <li>Manage modules</li>
        <li>View interested students</li>
        <li>Export mailing list</li>
      </ul>

      <a class="button" href="/logout">Logout</a>
    </section>
  `;

  return layoutView("Admin Dashboard", content);
}