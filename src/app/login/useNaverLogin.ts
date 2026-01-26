"use client";

import { ROUTES } from "@/constants/routes";

interface UseNaverLoginParams {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

interface UseNaverLoginReturn {
  isLoading: boolean;
  handleNaverLogin: () => void;
}

export function useNaverLogin({
  setIsLoading,
  setError,
}: UseNaverLoginParams): UseNaverLoginReturn {
  const OAUTH_CALLBACK_URL = `${typeof window !== "undefined" ? window.location.origin : ""}${ROUTES.AUTH_CALLBACK}`;

  const handleNaverLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(OAUTH_CALLBACK_URL);
    const state = `naver_${Math.random().toString(36).substring(7)}`;

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    setIsLoading(true);
    setError(null);

    window.location.href = naverAuthUrl;
  };

  return {
    isLoading: false,
    handleNaverLogin,
  };
}
