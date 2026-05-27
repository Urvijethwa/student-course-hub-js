// main.js
// Main entry point for the Student Course Hub application.
// This file receives HTTP requests and routes them to the correct response.

import { showProgrammes } from "./controllers/programmeController.js";
import { homeView } from "./views/homeView.js";

// Port number used for the local Deno server.
const PORT = 8000;

// Helper function to return HTML responses.
function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

// Helper function to serve the CSS file.
function cssResponse() {
  const css = Deno.readTextFileSync("./public/css/style.css");

  return new Response(css, {
    headers: {
      "content-type": "text/css; charset=utf-8",
    },
  });
}

// Main HTTP request handler.
// Every browser request enters the application here.
function handler(request) {
  const url = new URL(request.url);

  // Route: Home page
  if (url.pathname === "/") {
    return htmlResponse(homeView());
  }

  // Route: CSS file
  if (url.pathname === "/css/style.css") {
    return cssResponse();
  }

  // Route: Programmes page
if (url.pathname === "/programmes") {
  return htmlResponse(showProgrammes());
}

  // Route: 404 page
  return htmlResponse("<h1>404 - Page Not Found</h1>", 404);
}

// Start the server.
Deno.serve({ port: PORT }, handler);

console.log(`Server running at http://localhost:${PORT}`);