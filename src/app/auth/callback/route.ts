import { type NextRequest, NextResponse } from "next/server";
import { oauthLoginAction } from "@/app/actions/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url));
  }

  if (state === "kakao_login") {
    try {
      const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_KAKAO_APP_KEY || "",
          client_secret: process.env.KAKAO_CLIENT_SECRET || "",
          redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
          code,
        }),
      });

      if (!tokenResponse.ok) {
        const error = await tokenResponse.json();
        console.error("Kakao token exchange failed:", error);
        return NextResponse.redirect(
          new URL("/login?error=token_exchange_failed", request.url),
        );
      }

      const { access_token } = await tokenResponse.json();

      const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!userResponse.ok) {
        console.error("Kakao user info fetch failed");
        return NextResponse.redirect(
          new URL("/login?error=user_info_failed", request.url),
        );
      }

      const userInfo = await userResponse.json();

      await oauthLoginAction({
        provider: "Kakao",
        provider_user_id: String(userInfo.id),
        email: userInfo.kakao_account?.email || "",
        username:
          userInfo.kakao_account?.profile?.nickname ||
          userInfo.properties?.nickname ||
          "Kakao User",
      });

      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Kakao login error:", error);
      return NextResponse.redirect(
        new URL("/login?error=unknown", request.url),
      );
    }
  }

  return NextResponse.redirect(
    new URL("/login?error=invalid_state", request.url),
  );
}
