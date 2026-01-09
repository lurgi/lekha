export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  MEMOS: "/memos",
  AUTH_CALLBACK: "/auth/callback",
} as const;

export const PUBLIC_PATHS = [ROUTES.LOGIN, ROUTES.AUTH_CALLBACK];
export const PROTECTED_PATHS = [ROUTES.MEMOS];
