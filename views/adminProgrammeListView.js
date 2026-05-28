import { layoutView } from "./layoutView.js";

export function adminProgrammeListView(programmes) {
  const programmeRows = programmes.map((programme) => {
    const status =
      programme.published === 1
        ? "Published"
        : "Unpublished";

    return `
      <tr>
        <td>${programme.id}</td>

        <td>${programme.title}</td>

        <td>${programme.level}</td>

        <td>
          <span class="status-tag">
            ${status}
          </span>
        </td>

        <td>
          <div class="admin-button-group">

            <a
              class="button action-button"
              href="/admin/programmes/${programme.id}/edit"
            >
              Edit
            </a>

            <a
              class="button action-button"
              href="/admin/programmes/${programme.id}/modules/new"
            >
              Add Module
            </a>

            <form
              method="POST"
              action="/admin/programmes/${programme.id}/delete"
            >
              <button
                class="button action-button danger-button"
                type="submit"
                onclick="return confirm('Are you sure you want to delete this programme?')"
              >
                Delete
              </button>
            </form>

            <form
              method="POST"
              action="/admin/programmes/${programme.id}/toggle-publish"
            >
              <button
                class="button action-button"
                type="submit"
              >
                ${programme.published === 1 ? "Unpublish" : "Publish"}
              </button>
            </form>

          </div>
        </td>
      </tr>
    `;
  }).join("");

  const content = `
    <section class="card">

      <div class="page-header">
        <div>
          <h2>Manage Programmes</h2>

          <p>
            Manage programmes and add as many modules as needed.
          </p>
        </div>

        <a
          class="button"
          href="/admin/programmes/new"
        >
          Add New Programme
        </a>
      </div>

      <p class="info-box">
        To add multiple modules to a programme, click Add Module again
        after each module is created.
      </p>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Programme</th>
              <th>Level</th>
              <th>Status</th>
              <th>Actions</th>
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