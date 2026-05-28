import { findUserByUsername } from "../models/userModel.js";
import { createSession } from "../models/sessionModel.js";

import { loginView } from "../views/loginView.js";

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function validateLogin(username, password) {
  if (!username || !password) {
    return "Please complete all fields.";
  }

  if (username.length < 3) {
    return "Username must be at least 3 characters.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return "";
}

export function showLoginPage() {
  return loginView();
}

export async function loginUser(request) {
  const formData = await request.formData();

  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  const validationError = validateLogin(username, password);

  if (validationError) {
    return htmlResponse(loginView(validationError), 400);
  }

  const user = findUserByUsername(username);

  if (!user || user.password !== password) {
    return htmlResponse(loginView("Invalid username or password."), 401);
  }

  const sessionToken = crypto.randomUUID();

  createSession(sessionToken, user.id);

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