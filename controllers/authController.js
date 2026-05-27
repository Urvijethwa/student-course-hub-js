import { findUserByUsername } from "../models/userModel.js";
import { createSession } from "../models/sessionModel.js";


import { loginView } from "../views/loginView.js";

export function showLoginPage() {
  return loginView();
}

export async function loginUser(request) {

  // Read submitted form data from the POST request.
  const formData = await request.formData();

  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  // Validate empty fields.
  if (!username || !password) {
    return new Response(loginView("Please complete all fields."), {
      status: 400,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  // Find the user in the database.
  const user = findUserByUsername(username);

  // Check username and password.
  if (!user || user.password !== password) {
    return new Response(loginView("Invalid username or password."), {
      status: 401,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  }

  // Create a random session token.
  const sessionToken = crypto.randomUUID();

  // Save session token in SQLite.
  createSession(sessionToken, user.id);

  // Redirect to admin page and store session token in a cookie.
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/admin",
      "Set-Cookie": `session=${sessionToken}; HttpOnly; Path=/; SameSite=Lax`,
    },
  });
}

export function logoutUser() {
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/login",
      "Set-Cookie": "session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
    },
  });
}