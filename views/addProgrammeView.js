import { layoutView } from "./layoutView.js";

export function addProgrammeView(error = "") {

  const errorHtml = error
    ? `<p class="error">${error}</p>`
    : "";

  const content = `
    <section class="card">

      <h2>Add Programme</h2>

      ${errorHtml}

      <form method="POST" action="/admin/programmes/create">

        <label for="title">Programme Title</label>

        <input
          type="text"
          id="title"
          name="title"
          required
        >

        <label for="level">Level</label>

        <select id="level" name="level">

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
          required
        ></textarea>

        <button class="button" type="submit">
          Create Programme
        </button>

      </form>

    </section>
  `;

  return layoutView("Add Programme", content);

}