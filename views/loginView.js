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

      <p>
        Login to access the administration dashboard.
      </p>

      ${errorHtml}

      <form
        method="POST"
        action="/login"
        novalidate
      >

        <label for="username">
          Username
        </label>

        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          maxlength="50"
        >

        <small>
          Username must be at least 3 characters.
        </small>

        <label for="password">
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          maxlength="100"
        >

        <small>
          Password must be at least 6 characters.
        </small>

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

      <h2>
        Welcome ${user.username}
      </h2>

      <p>
        You are now logged in as an administrator.
      </p>

      <a class="button" href="/admin">
        Go to Admin Dashboard
      </a>

    </section>
  `;

  return layoutView(
    "Login Success",
    content,
  );

}