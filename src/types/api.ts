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
  access_token: string;
  expires_in: number;
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

export interface MemoResponse {
  id: number;
  user_id: number;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export type MemoListResponse = MemoResponse[];

export interface CreateMemoRequest {
  content: string;
}

export interface UpdateMemoRequest {
  content: string;
}

export interface AssistRequest {
  prompt: string;
  limit?: number;
}

export interface AssistResponse {
  suggestion: string;
  similar_memos: SimilarMemo[];
}

export interface SimilarMemo {
  id: number;
  content: string;
  created_at: string;
}
