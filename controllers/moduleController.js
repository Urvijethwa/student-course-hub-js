import { createModule } from "../models/moduleModel.js";

import { addModuleView } from "../views/addModuleView.js";

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

function validateModule(moduleName, moduleLeader, year) {
  if (!moduleName || !moduleLeader || !year) {
    return "Please complete all fields.";
  }

  if (moduleName.length < 3) {
    return "Module name must be at least 3 characters.";
  }

  if (moduleLeader.length < 2) {
    return "Module leader name is too short.";
  }

  if (
    year !== "1"
    && year !== "2"
    && year !== "3"
    && year !== "4"
  ) {
    return "Please select a valid year.";
  }

  return "";
}

export function showAddModulePage(programmeId) {
  return addModuleView(programmeId);
}

export async function createModuleFromRequest(
  request,
  programmeId,
) {

  const formData = await request.formData();

  const moduleName =
    formData.get("moduleName")?.toString().trim();

  const moduleLeader =
    formData.get("moduleLeader")?.toString().trim();

  const year =
    formData.get("year")?.toString().trim();

  const validationError = validateModule(
    moduleName,
    moduleLeader,
    year,
  );

  if (validationError) {
    return htmlResponse(
      addModuleView(programmeId, validationError),
      400,
    );
  }

  createModule(
    programmeId,
    moduleName,
    moduleLeader,
    year,
  );

  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/admin/programmes",
    },
  });

}