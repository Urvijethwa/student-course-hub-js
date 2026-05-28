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
  exportMailingListCsv,
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
  withdrawInterest,
} from "./controllers/interestController.js";

import {
  showLoginPage,
  loginUser,
  logoutUser,
} from "./controllers/authController.js";

import {
  showProgrammeDetails,
  searchProgrammesPage,
  getProgrammesJson,
} from "./controllers/programmeController.js";

import { homeView } from "./views/homeView.js";

const PORT = 8000;

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function cssResponse() {
  const css = Deno.readTextFileSync("./public/css/style.css");

  return new Response(css, {
    headers: {
      "content-type": "text/css; charset=utf-8",
    },
  });
}

async function handler(request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return htmlResponse(homeView());
  }

  if (url.pathname === "/css/style.css") {
    return cssResponse();
  }

  if (url.pathname === "/programmes") {
    return htmlResponse(searchProgrammesPage(url));
  }

  if (url.pathname.startsWith("/programmes/")) {
    const programmeId = Number(url.pathname.split("/")[2]);

    return htmlResponse(
      showProgrammeDetails(programmeId),
    );
  }

  if (url.pathname === "/interests/new") {
    const programmeId = Number(
      url.searchParams.get("programmeId"),
    );

    return htmlResponse(
      showInterestForm(programmeId),
    );
  }

  if (
    url.pathname === "/interests/create"
    && request.method === "POST"
  ) {
    return await createInterestFromRequest(request);
  }

  if (
    url.pathname.startsWith("/interests/")
    && url.pathname.endsWith("/withdraw")
    && request.method === "POST"
  ) {
    const interestId = Number(
      url.pathname.split("/")[2],
    );

    return withdrawInterest(interestId);
  }

  if (
    url.pathname === "/login"
    && request.method === "GET"
  ) {
    return htmlResponse(showLoginPage());
  }

  if (
    url.pathname === "/login"
    && request.method === "POST"
  ) {
    return await loginUser(request);
  }

  if (url.pathname === "/logout") {
    return logoutUser();
  }

  if (url.pathname === "/admin") {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    return htmlResponse(adminDashboardView());
  }

  if (url.pathname === "/admin/programmes/new") {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    return htmlResponse(showAddProgrammePage());
  }

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

  if (url.pathname === "/admin/programmes") {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    return htmlResponse(showAdminProgrammes());
  }

  if (
    url.pathname.startsWith("/admin/programmes/")
    && url.pathname.endsWith("/edit")
  ) {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    const id = Number(url.pathname.split("/")[3]);

    return htmlResponse(showEditProgrammePage(id));
  }

  if (
    url.pathname.startsWith("/admin/programmes/")
    && url.pathname.endsWith("/update")
    && request.method === "POST"
  ) {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    const id = Number(url.pathname.split("/")[3]);

    return await updateProgrammeFromRequest(request, id);
  }

  if (
    url.pathname.startsWith("/admin/programmes/")
    && url.pathname.endsWith("/delete")
    && request.method === "POST"
  ) {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    const id = Number(url.pathname.split("/")[3]);

    return deleteProgrammeFromRequest(id);
  }

  if (
    url.pathname.startsWith("/admin/programmes/")
    && url.pathname.endsWith("/toggle-publish")
    && request.method === "POST"
  ) {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    const id = Number(url.pathname.split("/")[3]);

    return toggleProgrammePublish(id);
  }

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

  if (url.pathname === "/admin/interests/export") {
    const auth = requireAdmin(request);

    if (!auth.authorised) {
      return auth.redirectResponse;
    }

    return exportMailingListCsv();
  }

  if (url.pathname === "/api/programmes") {
    return getProgrammesJson(url);
  }

  return htmlResponse("<h1>404 - Page Not Found</h1>", 404);
}

Deno.serve({ port: PORT }, handler);

console.log(`Server running at http://localhost:${PORT}`);