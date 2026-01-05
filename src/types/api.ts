export type OAuthProvider = "Google" | "Kakao" | "Naver";

export interface OAuthLoginRequest {
  provider: OAuthProvider;
  provider_user_id: string;
  email: string;
  username: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  user: UserResponse;
}

export interface ErrorResponse {
  error: string;
}

export interface GoogleUserInfo {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export interface KakaoUserInfo {
  id: number;
  kakao_account: {
    email?: string;
    profile?: {
      nickname?: string;
    };
  };
}

export interface NaverUserInfo {
  response: {
    id: string;
    email?: string;
    name?: string;
  };
}
