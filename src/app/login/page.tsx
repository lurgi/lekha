"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { oauthLoginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import type { OAuthProvider } from "@/types";

const OAUTH_CALLBACK_URL = `${typeof window !== "undefined" ? window.location.origin : ""}${ROUTES.AUTH_CALLBACK}`;

const COPYWRITING = {
  tagline: "당신의 생각이 💭 글이 되도록 ✏️",
  title: "Lekha",
} as const;

interface OAuthButtonProps {
  isLoading: boolean;
  setIsLoading: (provider: OAuthProvider | null) => void;
  setError: (error: string | null) => void;
}

function GoogleLoginButton({
  isLoading,
  setIsLoading,
  setError,
}: OAuthButtonProps) {
  const router = useRouter();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setIsLoading("Google");
        setError(null);

        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          },
        );

        const userInfo = await userInfoResponse.json();

        await oauthLoginAction({
          provider: "Google",
          provider_user_id: userInfo.sub,
          email: userInfo.email,
          username: userInfo.name,
        });

        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get("redirect") || ROUTES.MEMOS;
        router.replace(redirect);
      } catch (_err) {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(null);
      }
    },
    onError: () => {
      setError("Google 로그인에 실패했습니다.");
    },
  });

  return (
    <Button
      type="button"
      onClick={() => handleGoogleLogin()}
      disabled={isLoading}
      className="w-full bg-white border-2 border-neutral-300 text-neutral-900 hover:bg-neutral-50 rounded-xl focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          aria-label="Google 로고"
          role="img"
        >
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      <span>Google로 계속하기</span>
    </Button>
  );
}

function KakaoLoginButton({
  isLoading,
  setIsLoading,
  setError,
}: OAuthButtonProps) {
  useEffect(() => {
    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (window.Kakao && !window.Kakao.isInitialized() && kakaoAppKey) {
      window.Kakao.init(kakaoAppKey);
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      setError("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    setIsLoading("Kakao");
    setError(null);

    window.Kakao.Auth.authorize({
      redirectUri: OAUTH_CALLBACK_URL,
      state: "kakao_login",
      scope: "account_email",
    });
  };

  return (
    <Button
      type="button"
      onClick={handleKakaoLogin}
      disabled={isLoading}
      className="w-full bg-[#FEE500] text-neutral-900 hover:bg-[#FDD835] rounded-xl focus:ring-2 focus:ring-[#FEE500] focus:ring-offset-2"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-label="Kakao 로고"
          role="img"
        >
          <path d="M12 3C6.48 3 2 6.58 2 11c0 2.9 1.95 5.43 4.85 6.86-.06.25-.41 1.71-.47 1.98-.07.33.12.33.25.24.1-.07 2.39-1.64 2.92-2 .42.06.85.09 1.29.09 5.52 0 10-3.58 10-8S17.52 3 12 3z" />
        </svg>
      )}
      <span>Kakao로 계속하기</span>
    </Button>
  );
}

function NaverLoginButton({
  isLoading,
  setIsLoading,
  setError,
}: OAuthButtonProps) {
  const handleNaverLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(OAUTH_CALLBACK_URL);
    const state = `naver_${Math.random().toString(36).substring(7)}`;

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    setIsLoading("Naver");
    setError(null);

    window.location.href = naverAuthUrl;
  };

  return (
    <Button
      type="button"
      onClick={handleNaverLogin}
      disabled={isLoading}
      className="w-full bg-[#03C75A] text-white hover:bg-[#02B350] rounded-xl focus:ring-2 focus:ring-[#03C75A] focus:ring-offset-2"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-label="Naver 로고"
          role="img"
        >
          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z" />
        </svg>
      )}
      <span>Naver로 계속하기</span>
    </Button>
  );
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-8">
          <h1 className="text-display font-bold text-neutral-900">
            {COPYWRITING.title}
          </h1>
          <p className="text-body-lg md:text-h4 font-semibold text-primary-600">
            {COPYWRITING.tagline}
          </p>
        </div>

        <div className="space-y-3">
          <GoogleLoginButton
            isLoading={isLoading === "Google"}
            setIsLoading={setIsLoading}
            setError={setError}
          />
          <KakaoLoginButton
            isLoading={isLoading === "Kakao"}
            setIsLoading={setIsLoading}
            setError={setError}
          />
          <NaverLoginButton
            isLoading={isLoading === "Naver"}
            setIsLoading={setIsLoading}
            setError={setError}
          />
        </div>

        {error && (
          <p className="text-body-sm text-center text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
