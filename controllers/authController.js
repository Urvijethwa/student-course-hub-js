// controllers/authController.js
// This controller handles authentication requests.

import { findUserByUsername } from "../models/userModel.js";

import {
  loginView,
  loginSuccessView,
} from "../views/loginView.js";

export function showLoginPage() {
  return loginView();
}

export async function loginUser(request) {
  // Read submitted form data.
  const formData = await request.formData();

  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  // Validation check.
  if (!username || !password) {
    return loginView("Please complete all fields.");
  }

  // Find user from database.
  const user = findUserByUsername(username);

  // Check credentials.
  if (!user || user.password !== password) {
    return loginView("Invalid username or password.");
  }

  // Successful login.
  return loginSuccessView(user);
}