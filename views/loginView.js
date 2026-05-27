// views/loginView.js
// This view displays the admin login form.

import { layoutView } from "./layoutView.js";

export function loginView(error = "") {
  const errorHtml = error
    ? `<p class="error">${error}</p>`
    : "";

  const content = `
    <section class="card">
      <h2>Admin Login</h2>

      ${errorHtml}

      <form method="POST" action="/login">
        <label for="username">Username</label>

        <input
          type="text"
          id="username"
          name="username"
          required
        >

        <label for="password">Password</label>

        <input
          type="password"
          id="password"
          name="password"
          required
        >

        <button class="button" type="submit">
          Login
        </button>
      </form>
    </section>
  `;

  return layoutView("Login", content);
}

export function loginSuccessView(user) {
  const content = `
    <section class="card">
      <h2>Welcome ${user.username}</h2>

      <p>You are now logged in as an administrator.</p>

      <a class="button" href="/admin">
        Go to Admin Dashboard
      </a>
    </section>
  `;

  return layoutView("Login Success", content);
}