// views/layoutView.js
// This file contains the shared HTML layout for all pages.

export function layoutView(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">

      <!-- Responsive mobile layout -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>${title} | Student Course Hub</title>

      <!-- Main stylesheet -->
      <link rel="stylesheet" href="/css/style.css">
    </head>

    <body>
      <a class="skip-link" href="#main-content">
        Skip to content
      </a>

      <header class="site-header">
        <h1>Student Course Hub</h1>

        <p>
          Find university programmes and register your interest.
        </p>

        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/programmes">Programmes</a>
          <a href="/login">Admin Login</a>
        </nav>
      </header>

      <main id="main-content">
        ${content}
      </main>
    </body>

    </html>
  `;
}