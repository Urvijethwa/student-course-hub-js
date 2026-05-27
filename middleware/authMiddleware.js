import { getSessionByToken } from "../models/sessionModel.js";

function getCookie(request, cookieName) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");

    if (name === cookieName) {
      return value;
    }
  }

  return null;
}

export function requireAdmin(request) {
  const sessionToken = getCookie(request, "session");

  if (!sessionToken) {
    return {
      authorised: false,
      redirectResponse: new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      }),
    };
  }

  const session = getSessionByToken(sessionToken);

  if (!session) {
    return {
      authorised: false,
      redirectResponse: new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      }),
    };
  }

  return {
    authorised: true,
    session,
  };
}