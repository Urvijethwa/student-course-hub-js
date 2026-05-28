// views/layoutView.js
// Shared layout used across all pages.

export function layoutView(title, content) {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      >

      <title>${title} | Student Course Hub</title>

      <link
        rel="stylesheet"
        href="/css/style.css"
      >
    </head>

    <body>

      <a
        class="skip-link"
        href="#main-content"
      >
        Skip to content
      </a>

      <header class="site-header">

        <div class="hero-overlay">

          <h1>
            Student Course Hub
          </h1>

          <p>
            Find university programmes and register your interest.
          </p>

          <nav aria-label="Main navigation">

            <a href="/">
              Home
            </a>

            <a href="/programmes">
              Programmes
            </a>

            <a href="/login">
              Admin Login
            </a>

          </nav>

        </div>

      </header>

      <main id="main-content">
        ${content}
      </main>

      <footer class="site-footer">

        <p>
          Student Course Hub |
          Advanced Web Development Project
        </p>

        <p>
          Built with Deno, JavaScript,
          HTML, CSS and SQLite.
        </p>

      </footer>

    </body>

    </html>
  `;
}