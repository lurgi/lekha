"use client";

import { useEffect, useState } from "react";
import { ROUTES } from "@/constants/routes";

interface UseKakaoLoginParams {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

interface UseKakaoLoginReturn {
  isLoading: boolean;
  handleKakaoLogin: () => void;
  isSdkReady: boolean;
}

interface KakaoSDK {
  isInitialized: () => boolean;
  init: (appKey: string) => void;
  Auth: {
    authorize: (options: {
      redirectUri: string;
      state: string;
      scope: string;
    }) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

export function useKakaoLogin({
  setIsLoading,
  setError,
}: UseKakaoLoginParams): UseKakaoLoginReturn {
  const [isSdkReady, setIsSdkReady] = useState(false);

  const OAUTH_CALLBACK_URL = `${typeof window !== "undefined" ? window.location.origin : ""}${ROUTES.AUTH_CALLBACK}`;

  useEffect(() => {
    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (window.Kakao?.isInitialized?.() === false && kakaoAppKey) {
      window.Kakao.init(kakaoAppKey);
      setIsSdkReady(true);
    } else if (window.Kakao?.isInitialized?.() === true) {
      setIsSdkReady(true);
    }
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      setError("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    setIsLoading(true);
    setError(null);

    window.Kakao.Auth.authorize({
      redirectUri: OAUTH_CALLBACK_URL,
      state: "kakao_login",
      scope: "account_email",
    });
  };

  return {
    isLoading: false,
    handleKakaoLogin,
    isSdkReady,
  };
}
