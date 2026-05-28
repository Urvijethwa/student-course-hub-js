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

      <p>
        Add a new module to this programme.
      </p>

      ${errorHtml}

      <form
        method="POST"
        action="/admin/programmes/${programmeId}/modules/create"
        novalidate
      >

        <label for="moduleName">
          Module Name
        </label>

        <input
          type="text"
          id="moduleName"
          name="moduleName"
          placeholder="Enter module name"
          maxlength="100"
        >

        <small>
          Minimum 3 characters required.
        </small>

        <label for="moduleLeader">
          Module Leader
        </label>

        <input
          type="text"
          id="moduleLeader"
          name="moduleLeader"
          placeholder="Enter module leader name"
          maxlength="100"
        >

        <small>
          Minimum 2 characters required.
        </small>

        <label for="year">
          Year
        </label>

        <select id="year" name="year">

          <option value="">
            Select year
          </option>

          <option value="1">
            Year 1
          </option>

          <option value="2">
            Year 2
          </option>

          <option value="3">
            Year 3
          </option>

          <option value="4">
            Year 4
          </option>

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