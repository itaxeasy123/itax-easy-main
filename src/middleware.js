import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // hasAccess: a live httpOnly access token = genuinely authenticated.
  // hasSession: also counts the persistent currentUser marker (a 20-day session
  // whose 6h access token may have expired — the client refreshes it).
  const hasAccess = Boolean(request.cookies.get("authToken")?.value);
  const hasSession =
    hasAccess || Boolean(request.cookies.get("currentUser")?.value);

  // Protect the dashboard (lenient — the client guard verifies and clears any
  // stale cookie). Remember where the user was headed so login can return them.
  if (pathname.startsWith("/dashboard") && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  // Keep genuinely-authenticated users off the auth pages. Strict on purpose:
  // require a live access token so a stale currentUser cookie can't bounce a
  // logged-out user away from /login.
  if ((pathname === "/login" || pathname === "/signup") && hasAccess) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
