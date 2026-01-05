"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { oauthLoginAction } from "@/app/actions/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (!code) {
        setError("인증 코드를 받지 못했습니다.");
        return;
      }

      try {
        if (state === "kakao_login") {
          if (!window.Kakao || !window.Kakao.isInitialized()) {
            const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
            if (kakaoAppKey) {
              window.Kakao?.init(kakaoAppKey);
            }
          }

          await new Promise<void>((resolve, reject) => {
            window.Kakao.Auth.setAccessToken(code);

            window.Kakao.API.request({
              url: "/v2/user/me",
              success: async (response) => {
                try {
                  await oauthLoginAction({
                    provider: "Kakao",
                    provider_user_id: String(response.id),
                    email: response.kakao_account?.email || "",
                    username:
                      response.kakao_account?.profile?.nickname ||
                      response.properties?.nickname ||
                      "Kakao User",
                  });
                  resolve();
                } catch (err) {
                  reject(err);
                }
              },
              fail: (error) => {
                reject(error);
              },
            });
          });

          router.push("/");
        } else if (state?.startsWith("naver_")) {
          setError("Naver 로그인은 아직 구현되지 않았습니다.");
        } else {
          setError("알 수 없는 OAuth 제공자입니다.");
        }
      } catch (_err) {
        setError("로그인 처리 중 오류가 발생했습니다.");
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-4">
          <h1 className="text-h3 font-bold text-neutral-900">로그인 실패</h1>
          <p className="text-body text-neutral-700">{error}</p>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary-500" />
        <p className="text-body text-neutral-700">로그인 중...</p>
      </div>
    </div>
  );
}
