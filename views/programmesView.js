import { layoutView } from "./layoutView.js";

export function programmesView(
  programmes,
  searchTerm = "",
  selectedLevel = "",
) {
  const programmeCards = programmes.map((programme) => {
    return `
      <article class="card programme-card">
        <h3>${programme.title}</h3>

        <p class="tag">${programme.level}</p>

        <p>${programme.description}</p>

        <a class="button" href="/programmes/${programme.id}">
          View Details
        </a>
      </article>
    `;
  }).join("");

  const noResultsMessage =
    programmes.length === 0
      ? `<p class="error">No programmes found.</p>`
      : "";

  const content = `
    <section>
      <h2>Available Programmes</h2>

      <p>
        Browse undergraduate and postgraduate programmes.
      </p>

      <form method="GET" action="/programmes" class="search-form">

        <label for="search">
          Search programmes
        </label>

        <input
          type="text"
          id="search"
          name="search"
          value="${searchTerm}"
          placeholder="Search by keyword"
        >

        <label for="level">
          Filter by level
        </label>

        <select id="level" name="level">

          <option value="">
            All Levels
          </option>

          <option
            value="Undergraduate"
            ${selectedLevel === "Undergraduate" ? "selected" : ""}
          >
            Undergraduate
          </option>

          <option
            value="Postgraduate"
            ${selectedLevel === "Postgraduate" ? "selected" : ""}
          >
            Postgraduate
          </option>

        </select>

        <button class="button" type="submit">
          Search
        </button>

      </form>

      ${noResultsMessage}

      <div class="grid">
        ${programmeCards}
      </div>
    </section>
  `;

  return layoutView("Programmes", content);
}