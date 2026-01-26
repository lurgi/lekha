"use client";

import { useGoogleLogin as useGoogleLoginLib } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { oauthLoginAction, setAccessTokenCookie } from "@/app/actions/auth";
import { ROUTES } from "@/constants/routes";

interface UseGoogleLoginParams {
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

interface UseGoogleLoginReturn {
  handleGoogleLogin: () => void;
}

export function useGoogleLogin({
  setIsLoading,
  setError,
}: UseGoogleLoginParams): UseGoogleLoginReturn {
  const router = useRouter();

  const handleGoogleLogin = useGoogleLoginLib({
    onSuccess: async (response) => {
      try {
        setIsLoading(true);
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
        }).then(async (data) => {
          await setAccessTokenCookie(data);
        });

        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get("redirect") || ROUTES.MEMOS;
        router.replace(redirect);
      } catch (_err) {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setError("Google 로그인에 실패했습니다.");
    },
  });

  return {
    handleGoogleLogin,
  };
}
