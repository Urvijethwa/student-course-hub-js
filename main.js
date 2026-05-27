// main.js
// This is the main entry point of the Student Course Hub application.
// It creates the Deno web server and handles incoming HTTP requests.

// Define the port number for the local server.
const PORT = 8000;

// Main request handler function.
// Every HTTP request comes through this function first.
function handler(request) {
  // Convert the request URL into a URL object so we can read the path.
  const url = new URL(request.url);

  // Route: Home page
  // If the user visits "/", return a simple HTML page.
  if (url.pathname === "/") {
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Student Course Hub</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <header>
          <h1>Student Course Hub</h1>
          <p>Find university programmes and register your interest.</p>
        </header>

        <main>
          <section class="card">
            <h2>Welcome</h2>
            <p>This project will allow students to view programmes, see modules, and register interest.</p>
            <a class="button" href="/programmes">View Programmes</a>
          </section>
        </main>
      </body>
      </html>
      `,
      {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      }
    );
  }

  // Route: CSS file
  // This serves the stylesheet from the public/css folder.
  if (url.pathname === "/css/style.css") {
    const css = Deno.readTextFileSync("./public/css/style.css");

    return new Response(css, {
      headers: {
        "content-type": "text/css; charset=utf-8",
      },
    });
  }

  // If no route matches, return a 404 page.
  return new Response("<h1>404 - Page Not Found</h1>", {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

// Start the Deno server.
Deno.serve({ port: PORT }, handler);

console.log(`Server running at http://localhost:${PORT}`);