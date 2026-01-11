import { z } from "zod";

export const createMemoSchema = z.object({
  content: z
    .string()
    .min(1, "메모 내용을 입력해주세요")
    .max(1000, "메모는 1000자를 초과할 수 없습니다")
    .trim(),
});

export const updateMemoSchema = z.object({
  content: z
    .string()
    .min(1, "메모 내용을 입력해주세요")
    .max(1000, "메모는 1000자를 초과할 수 없습니다")
    .trim(),
});

export const assistRequestSchema = z.object({
  prompt: z
    .string()
    .min(1, "프롬프트를 입력해주세요")
    .max(1000, "프롬프트는 1000자를 초과할 수 없습니다")
    .trim(),
  limit: z
    .number()
    .int()
    .min(0, "limit은 0 이상이어야 합니다")
    .max(20, "limit은 20 이하여야 합니다")
    .optional(),
});

export const memoResponseSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  content: z.string(),
  is_pinned: z.boolean(),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const similarMemoSchema = z.object({
  id: z.number(),
  content: z.string(),
  created_at: z.iso.datetime(),
});

export const assistResponseSchema = z.object({
  suggestion: z.string(),
  similar_memos: z.array(similarMemoSchema),
});

export type CreateMemoInput = z.infer<typeof createMemoSchema>;
export type UpdateMemoInput = z.infer<typeof updateMemoSchema>;
export type AssistRequestInput = z.infer<typeof assistRequestSchema>;
export type MemoResponseValidated = z.infer<typeof memoResponseSchema>;
export type AssistResponseValidated = z.infer<typeof assistResponseSchema>;
