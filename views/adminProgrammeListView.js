import { layoutView } from "./layoutView.js";

export function adminProgrammeListView(programmes) {
  const programmeRows = programmes.map((programme) => {
    const status = programme.published === 1 ? "Published" : "Unpublished";

    return `
      <tr>
        <td>${programme.id}</td>
        <td>${programme.title}</td>
        <td>${programme.level}</td>
        <td>${status}</td>

        <td>
          <a
            class="button small-button"
            href="/admin/programmes/${programme.id}/edit"
          >
            Edit
          </a>

          <a
          class="button small-button"
          href="/admin/programmes/${programme.id}/modules/new"
          >
          Add Module
        </a>

          <form
            method="POST"
            action="/admin/programmes/${programme.id}/delete"
            style="display:inline;"
          >
            <button
              class="button small-button danger-button"
              type="submit"
              onclick="return confirm('Are you sure you want to delete this programme?')"
            >
              Delete
            </button>
          </form>

          <form
            method="POST"
            action="/admin/programmes/${programme.id}/toggle-publish"
            style="display:inline;"
          >
            <button
              class="button small-button"
              type="submit"
            >
              ${programme.published === 1 ? "Unpublish" : "Publish"}
            </button>
          </form>
        </td>
      </tr>
    `;
  }).join("");

  const content = `
    <section class="card">
      <h2>Manage Programmes</h2>

      <p>
        This page shows all programmes stored in the database.
      </p>

      <a class="button" href="/admin/programmes/new">
        Add New Programme
      </a>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Programme</th>
              <th>Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            ${programmeRows}
          </tbody>
        </table>
      </div>
    </section>
  `;

  return layoutView("Manage Programmes", content);
}