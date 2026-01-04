---
paths: src/app/actions/**/*.ts
---

# Server Actions 규칙

이 폴더의 모든 파일은 Server Actions입니다.

## 필수 구조

```typescript
"use server";

import type { Request, Response } from "@/types/api";

export async function someAction(request: Request): Promise<Response> {
	const response = await fetch(`${API_BASE_URL}/api/endpoint`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
		credentials: "include",
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Action failed");
	}

	return response.json();
}
```

## 필수 요소

- ✅ `"use server"` 지시어 (파일 최상단)
- ✅ 타입 안전성: Request/Response 타입 명시
- ✅ `credentials: "include"` (httpOnly 쿠키 전송)
- ✅ 에러 처리: `response.ok` 확인 후 throw

## 네이밍 규칙

- 함수명: `{동사}{명사}Action`
  - 예: `oauthLoginAction`, `createMemoAction`
- 파일명: 리소스 단위 그룹화
  - 예: `auth.ts`, `memos.ts`

## 쿠키 처리

로그인/로그아웃 시 쿠키 설정:

```typescript
import { cookies } from "next/headers";

const cookieStore = await cookies();
cookieStore.set({
	name: "access_token",
	value: token,
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "strict",
	path: "/",
});
```

전체 규칙: `.claude/server-actions.md` 참고
