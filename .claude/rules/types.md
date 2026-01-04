---
paths: src/types/**/*.ts
---

# 타입 정의 규칙

## API 타입 (src/types/api.ts)

모든 Backend API 관련 타입을 정의합니다.

**네이밍 규칙:**
- Request: `{Operation}{Resource}Request`
  - 예: `CreateMemoRequest`, `OAuthLoginRequest`
- Response: `{Resource}Response`
  - 예: `MemoResponse`, `AuthResponse`
- Union Type: PascalCase
  - 예: `OAuthProvider`

**예시:**

```typescript
export type OAuthProvider = "Google" | "Kakao" | "Naver";

export interface OAuthLoginRequest {
	provider: OAuthProvider;
	provider_user_id: string;
	email: string;
	username: string;
}

export interface AuthResponse {
	user: UserResponse;
}
```

**주의사항:**
- ✅ ISO 8601 날짜는 `string` 타입
- ✅ Optional 필드는 `?` 사용
- ✅ Backend 스펙과 정확히 일치

전체 규칙: `.claude/api-spec.md` 참고
