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
