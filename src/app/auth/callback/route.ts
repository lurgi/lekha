import { type NextRequest, NextResponse } from "next/server";
import { oauthLoginAction } from "@/app/actions/auth";
import { ROUTES } from "@/constants/routes";

interface KakaoUserInfo {
  id: number;
  connected_at: string;
  kakao_account: {
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email: string;
  };
}
interface NaverUserInfo {
  resultcode: string;
  message: string;
  response: {
    id: string;
    email: string;
    name?: string;
    nickname?: string;
  };
}

async function handleKakaoCallback(
  code: string,
  request: NextRequest,
): Promise<NextResponse> {
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
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${ROUTES.AUTH_CALLBACK}`,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      console.error("Kakao token exchange failed:", error);
      return NextResponse.redirect(
        new URL(`${ROUTES.LOGIN}?error=token_exchange_failed`, request.url),
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
        new URL(`${ROUTES.LOGIN}?error=user_info_failed`, request.url),
      );
    }

    const userInfo: KakaoUserInfo = await userResponse.json();

    await oauthLoginAction({
      provider: "Kakao",
      provider_user_id: String(userInfo.id),
      email: userInfo.kakao_account?.email,
      username: "User",
    });

    const searchParams = request.nextUrl.searchParams;
    const redirectPath = searchParams.get("redirect") || ROUTES.MEMOS;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  } catch (error) {
    console.error("Kakao login error:", error);
    return NextResponse.redirect(
      new URL(`${ROUTES.LOGIN}?error=unknown`, request.url),
    );
  }
}

async function handleNaverCallback(
  code: string,
  state: string,
  request: NextRequest,
): Promise<NextResponse> {
  try {
    const tokenResponse = await fetch("https://nid.naver.com/oauth2.0/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
        client_secret: process.env.NAVER_CLIENT_SECRET || "",
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}${ROUTES.AUTH_CALLBACK}`,
        code,
        state,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      console.error("Naver token exchange failed:", error);
      return NextResponse.redirect(
        new URL(`${ROUTES.LOGIN}?error=token_exchange_failed`, request.url),
      );
    }

    const { access_token } = await tokenResponse.json();

    const userResponse = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userResponse.ok) {
      console.error("Naver user info fetch failed");
      const res = await userResponse.json();
      console.log(res);
      return NextResponse.redirect(
        new URL(`${ROUTES.LOGIN}?error=user_info_failed`, request.url),
      );
    }

    const userResult: NaverUserInfo = await userResponse.json();

    if (userResult.resultcode !== "00") {
      console.error("Naver API error:", userResult.message);
      return NextResponse.redirect(
        new URL(`${ROUTES.LOGIN}?error=naver_api_failed`, request.url),
      );
    }

    await oauthLoginAction({
      provider: "Naver",
      provider_user_id: userResult.response.id,
      email: userResult.response.email,
      username:
        userResult.response.nickname ||
        userResult.response.name ||
        "Naver User",
    });

    const searchParams = request.nextUrl.searchParams;
    const redirectPath = searchParams.get("redirect") || ROUTES.MEMOS;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  } catch (error) {
    console.error("Naver login error:", error);
    return NextResponse.redirect(
      new URL(`${ROUTES.LOGIN}?error=unknown`, request.url),
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(
      new URL(`${ROUTES.LOGIN}?error=no_code`, request.url),
    );
  }

  if (!state) {
    return NextResponse.redirect(
      new URL(`${ROUTES.LOGIN}?error=no_state`, request.url),
    );
  }

  if (state === "kakao_login") {
    return handleKakaoCallback(code, request);
  }

  if (state.startsWith("naver_")) {
    return handleNaverCallback(code, state, request);
  }

  return NextResponse.redirect(
    new URL(`${ROUTES.LOGIN}?error=invalid_state`, request.url),
  );
}
