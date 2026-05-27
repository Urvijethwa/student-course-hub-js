import { layoutView } from "./layoutView.js";

export function editProgrammeView(
  programme,
  error = "",
) {

  const errorHtml = error
    ? `<p class="error">${error}</p>`
    : "";

  const content = `
    <section class="card">

      <h2>Edit Programme</h2>

      ${errorHtml}

      <form
        method="POST"
        action="/admin/programmes/${programme.id}/update"
      >

        <label for="title">
          Programme Title
        </label>

        <input
          type="text"
          id="title"
          name="title"
          value="${programme.title}"
          required
        >

        <label for="level">
          Level
        </label>

        <select id="level" name="level">

          <option
            value="Undergraduate"
            ${programme.level === "Undergraduate"
              ? "selected"
              : ""}
          >
            Undergraduate
          </option>

          <option
            value="Postgraduate"
            ${programme.level === "Postgraduate"
              ? "selected"
              : ""}
          >
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
        >${programme.description}</textarea>

        <button class="button" type="submit">
          Update Programme
        </button>

      </form>

    </section>
  `;

  return layoutView(
    "Edit Programme",
    content,
  );

}