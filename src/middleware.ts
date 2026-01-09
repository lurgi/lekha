import { type NextRequest, NextResponse } from "next/server";
import { PROTECTED_PATHS, ROUTES } from "@/constants/routes";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  if (pathname === ROUTES.HOME) {
    if (accessToken) {
      return NextResponse.redirect(new URL(ROUTES.MEMOS, request.url));
    }
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (pathname === ROUTES.LOGIN && accessToken) {
    return NextResponse.redirect(new URL(ROUTES.MEMOS, request.url));
  }

  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path),
  );
  if (isProtectedPath && !accessToken) {
    const url = new URL(ROUTES.LOGIN, request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
