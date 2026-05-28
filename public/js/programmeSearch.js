// Live programme search using Fetch API.

const searchInput =
  document.querySelector("#live-search");

const resultsContainer =
  document.querySelector("#programme-results");


// Listen for typing in the search box.
searchInput.addEventListener("input", async () => {

  const searchTerm = searchInput.value.trim();

  // Fetch JSON data from the server.
  const response = await fetch(
    `/api/programmes?search=${encodeURIComponent(searchTerm)}`
  );

  const programmes = await response.json();

  // Clear old results.
  resultsContainer.innerHTML = "";

  // Show message if nothing found.
  if (programmes.length === 0) {

    resultsContainer.innerHTML = `
      <p class="error">
        No programmes found.
      </p>
    `;

    return;
  }

  // Generate updated programme cards.
  for (const programme of programmes) {

    resultsContainer.innerHTML += `
      <article class="card programme-card">

        <h3>${programme.title}</h3>

        <p class="tag">${programme.level}</p>

        <p>${programme.description}</p>

        <a
          class="button"
          href="/programmes/${programme.id}"
        >
          View Details
        </a>

      </article>
    `;
  }

});