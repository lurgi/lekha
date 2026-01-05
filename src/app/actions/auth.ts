"use server";

import { cookies } from "next/headers";
import type { AuthResponse, OAuthLoginRequest } from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function oauthLoginAction(
  request: OAuthLoginRequest,
): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/api/users/oauth-login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "OAuth login failed");
  }

  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    const cookieStore = await cookies();
    const tokenMatch = setCookieHeader.match(/access_token=([^;]+)/);
    const maxAgeMatch = setCookieHeader.match(/Max-Age=(\d+)/);

    if (tokenMatch) {
      cookieStore.set({
        name: "access_token",
        value: tokenMatch[1],
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: maxAgeMatch ? Number.parseInt(maxAgeMatch[1], 10) : 86400,
        path: "/",
      });
    }
  }

  return response.json();
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
