import { layoutView } from "./layoutView.js";

export function addModuleView(
  programmeId,
  error = "",
) {

  const errorHtml = error
    ? `<p class="error">${error}</p>`
    : "";

  const content = `
    <section class="card">

      <h2>Add Module</h2>

      ${errorHtml}

      <form
        method="POST"
        action="/admin/programmes/${programmeId}/modules/create"
      >

        <label for="moduleName">
          Module Name
        </label>

        <input
          type="text"
          id="moduleName"
          name="moduleName"
          required
        >

        <label for="moduleLeader">
          Module Leader
        </label>

        <input
          type="text"
          id="moduleLeader"
          name="moduleLeader"
          required
        >

        <label for="year">
          Year
        </label>

        <select id="year" name="year">

          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>

        </select>

        <button class="button" type="submit">
          Add Module
        </button>

      </form>

    </section>
  `;

  return layoutView(
    "Add Module",
    content,
  );

}