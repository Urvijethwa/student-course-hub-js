// views/interestFormView.js
// This view displays the form for students to register interest.

import { layoutView } from "./layoutView.js";

export function interestFormView(programme, error = "") {

  const errorHtml = error
    ? `<p class="error" role="alert">${error}</p>`
    : "";

  const content = `
    <section class="card">

      <a href="/programmes/${programme.id}">
        ← Back to programme
      </a>

      <h2>Register Interest</h2>

      <p>
        You are registering interest for:
      </p>

      <p>
        <strong>${programme.title}</strong>
      </p>

      ${errorHtml}

      <form
        method="POST"
        action="/interests/create"
        novalidate
      >

        <input
          type="hidden"
          name="programmeId"
          value="${programme.id}"
        >

        <label for="studentName">
          Full name
        </label>

        <input
          type="text"
          id="studentName"
          name="studentName"
          placeholder="Enter your full name"
          maxlength="100"
        >

        <small>
          Minimum 2 characters required.
        </small>

        <label for="email">
          Email address
        </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          maxlength="150"
        >

        <small>
          Please enter a valid email address.
        </small>

        <button class="button" type="submit">
          Register Interest
        </button>

      </form>

    </section>
  `;

  return layoutView("Register Interest", content);

}

export function interestSuccessView() {

  const content = `
    <section class="card">

      <h2>Interest Registered</h2>

      <p>
        Your interest has been saved successfully.
      </p>

      <a class="button" href="/programmes">
        Back to Programmes
      </a>

    </section>
  `;

  return layoutView(
    "Interest Registered",
    content,
  );

}