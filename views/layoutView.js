// views/layoutView.js
// This file contains the main HTML layout used by all pages.
// It prevents repeating the same HTML structure in every view.

export function layoutView(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">

      <!-- Makes the website responsive on mobile devices -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>${title} | Student Course Hub</title>

      <!-- Links the main CSS file -->
      <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <header class="site-header">
        <h1>Student Course Hub</h1>
        <p>Find university programmes and register your interest.</p>

        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/programmes">Programmes</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>

      <main>
        ${content}
      </main>
    </body>
    </html>
  `;
}