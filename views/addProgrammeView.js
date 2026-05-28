import { layoutView } from "./layoutView.js";

export function addProgrammeView(error = "") {

  const errorHtml = error
    ? `<p class="error">${error}</p>`
    : "";

  const content = `
    <section class="card">

      <h2>Add Programme</h2>

      <p>
        Create a new university programme.
      </p>

      ${errorHtml}

      <form
        method="POST"
        action="/admin/programmes/create"
        novalidate
      >

        <label for="title">
          Programme Title
        </label>

        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter programme title"
          maxlength="100"
        >

        <small>
          Minimum 3 characters required.
        </small>

        <label for="level">
          Level
        </label>

        <select id="level" name="level">

          <option value="">
            Select programme level
          </option>

          <option value="Undergraduate">
            Undergraduate
          </option>

          <option value="Postgraduate">
            Postgraduate
          </option>

        </select>

        <label for="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows="6"
          maxlength="1000"
          placeholder="Enter programme description"
        ></textarea>

        <small>
          Minimum 20 characters required.
        </small>

        <button class="button" type="submit">
          Create Programme
        </button>

      </form>

    </section>
  `;

  return layoutView("Add Programme", content);

}