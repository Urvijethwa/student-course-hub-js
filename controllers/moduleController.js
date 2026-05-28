import { createModule } from "../models/moduleModel.js";

import { addModuleView } from "../views/addModuleView.js";

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

  if (
    !moduleName
    || !moduleLeader
    || !year
  ) {
    return addModuleView(
      programmeId,
      "Please complete all fields.",
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