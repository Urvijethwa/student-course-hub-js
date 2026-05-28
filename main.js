// Main entry point for the Student Course Hub application.
// This file receives HTTP requests and routes them to the correct response.
import {
  showAddProgrammePage,
  createProgrammeFromRequest,
  showAdminProgrammes,
  showEditProgrammePage,
  updateProgrammeFromRequest,
  deleteProgrammeFromRequest,
  toggleProgrammePublish,
  showMailingList,
} from "./controllers/adminController.js";

import {
  showAddModulePage,
  createModuleFromRequest,
} from "./controllers/moduleController.js";

import { requireAdmin } from "./middleware/authMiddleware.js";
import { adminDashboardView } from "./views/adminView.js";

import {
  showInterestForm,
  createInterestFromRequest,
} from "./controllers/interestController.js";

import {
  showLoginPage,
  loginUser,
  logoutUser,
} from "./controllers/authController.js";

import {
  showProgrammes,
  showProgrammeDetails,
} from "./controllers/programmeController.js";

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
// It is async because POST form handling uses await request.formData().
async function handler(request) {
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

  // Route: Programme details page
  // Example: /programmes/1
  if (url.pathname.startsWith("/programmes/")) {
    const programmeId = Number(url.pathname.split("/")[2]);
    return htmlResponse(showProgrammeDetails(programmeId));
  }

  // Route: Show register interest form
  // Example: /interests/new?programmeId=1
  if (url.pathname === "/interests/new") {
    const programmeId = Number(url.searchParams.get("programmeId"));
    return htmlResponse(showInterestForm(programmeId));
  }

  // Route: Save student interest registration
  // This route only works when the form uses method="POST".
  if (url.pathname === "/interests/create" && request.method === "POST") {
    return htmlResponse(await createInterestFromRequest(request));
  }

  // Route: Show login page
if (url.pathname === "/login" && request.method === "GET") {
  return htmlResponse(showLoginPage());
}

// Route: Process login form
if (url.pathname === "/login" && request.method === "POST") {
  return await loginUser(request);
}

// Route: Protected admin dashboard
if (url.pathname === "/admin") {
  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  return htmlResponse(adminDashboardView());
}

if (url.pathname === "/logout") {
  return logoutUser();
}

// Route: Show add programme form
if (url.pathname === "/admin/programmes/new") {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  return htmlResponse(showAddProgrammePage());

}


// Route: Create new programme
if (
  url.pathname === "/admin/programmes/create"
  && request.method === "POST"
) {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  return await createProgrammeFromRequest(request);

}

// Route: Admin programme management page
if (url.pathname === "/admin/programmes") {
  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  return htmlResponse(showAdminProgrammes());
}

// Route: Show edit programme form
if (
  url.pathname.startsWith("/admin/programmes/")
  && url.pathname.endsWith("/edit")
) {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  const id = Number(
    url.pathname.split("/")[3],
  );

  return htmlResponse(
    showEditProgrammePage(id),
  );

}


// Route: Update programme
if (
  url.pathname.startsWith("/admin/programmes/")
  && url.pathname.endsWith("/update")
  && request.method === "POST"
) {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  const id = Number(
    url.pathname.split("/")[3],
  );

  return await updateProgrammeFromRequest(
    request,
    id,
  );

}

// Route: Delete programme
if (
  url.pathname.startsWith("/admin/programmes/")
  && url.pathname.endsWith("/delete")
  && request.method === "POST"
) {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  const id = Number(
    url.pathname.split("/")[3],
  );

  return deleteProgrammeFromRequest(id);

}

// Route: Publish/unpublish programme
if (
  url.pathname.startsWith("/admin/programmes/")
  && url.pathname.endsWith("/toggle-publish")
  && request.method === "POST"
) {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  const id = Number(
    url.pathname.split("/")[3],
  );

  return toggleProgrammePublish(id);

}

// Route: Show add module form
if (
  url.pathname.startsWith("/admin/programmes/")
  && url.pathname.endsWith("/modules/new")
) {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  const programmeId = Number(
    url.pathname.split("/")[3],
  );

  return htmlResponse(
    showAddModulePage(programmeId),
  );

}


// Route: Create module
if (
  url.pathname.startsWith("/admin/programmes/")
  && url.pathname.endsWith("/modules/create")
  && request.method === "POST"
) {

  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  const programmeId = Number(
    url.pathname.split("/")[3],
  );

  return await createModuleFromRequest(
    request,
    programmeId,
  );

}

if (url.pathname === "/admin/interests") {
  const auth = requireAdmin(request);

  if (!auth.authorised) {
    return auth.redirectResponse;
  }

  return htmlResponse(showMailingList());
}

  // Route: 404 page
  return htmlResponse("<h1>404 - Page Not Found</h1>", 404);
}

// Start the Deno server.
Deno.serve({ port: PORT }, handler);

console.log(`Server running at http://localhost:${PORT}`);