import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirigir raíz al dashboard
  if (pathname === "/") {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/dashboard";
    return NextResponse.redirect(dashboardUrl);
  }

  // Redirigir login al dashboard en modo demo
  if (pathname.startsWith("/login")) {
    const isDemoMode = request.nextUrl.searchParams.get("demo") !== null ||
      process.env.NEXT_PUBLIC_DEMO_MODE === "true";

    if (isDemoMode) {
      const dashboardUrl = request.nextUrl.clone();
      dashboardUrl.pathname = "/dashboard";
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icons|manifest\\.json|api/).*)",
  ],
};
