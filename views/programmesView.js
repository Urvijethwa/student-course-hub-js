import { escapeHtml } from "../utils/escapeHtml.js";
import { layoutView } from "./layoutView.js";

export function programmesView(
  programmes,
  searchTerm = "",
  selectedLevel = "",
) {
  const programmeCards = programmes.map((programme) => {
    return `
      <article class="card programme-card">
        <h3>${escapeHtml(programme.title)}</h3>

        <p class="tag">${escapeHtml(programme.level)}</p>

        <p>${escapeHtml(programme.description)}</p>

        <a class="button card-button" href="/programmes/${programme.id}">
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

        <div class="form-group">
          <label for="search">
            Search programmes
          </label>

          <input
            type="text"
            id="search"
            name="search"
            value="${escapeHtml(searchTerm)}"
            placeholder="Search by keyword"
          >
        </div>

        <div class="form-group">
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
        </div>

        <button class="button search-button" type="submit">
          Search
        </button>

      </form>

      ${noResultsMessage}

      <section class="live-search-section">
        <label for="live-search">
          Live Search
        </label>

        <input
          type="text"
          id="live-search"
          placeholder="Type to search programmes..."
        >
      </section>

      <div
        class="grid"
        id="programme-results"
        aria-live="polite"
      >
        ${programmeCards}
      </div>

      <script src="/js/programmeSearch.js"></script>
    </section>
  `;

  return layoutView("Programmes", content);
}