# Server Actions 및 데이터 페칭 규칙

> Lekha 프로젝트의 서버-클라이언트 통신 규칙

---

## 1. 기본 원칙

### Server Actions 우선 사용
- 모든 백엔드 API 호출은 Server Actions를 통해 수행
- 클라이언트에서 직접 fetch 호출 금지
- 보안, 타입 안전성, 번들 크기 최적화

### TanStack Query로 호출
- 모든 Server Actions는 TanStack Query를 통해 호출
- 상태 관리, 캐싱, 에러 처리 자동화
- useMutation (쓰기), useQuery (읽기) 사용

---

## 2. 파일 구조

```
src/
├── app/
│   └── actions/
│       ├── auth.ts           # 인증 관련 Server Actions
│       ├── memos.ts          # 메모 관련 Server Actions
│       └── assist.ts         # AI 어시스턴트 Server Actions
│
├── hooks/
│   ├── mutations/
│   │   ├── useOAuthLogin.ts  # 로그인 mutation
│   │   ├── useCreateMemo.ts  # 메모 생성 mutation
│   │   └── ...
│   └── queries/
│       ├── useMemos.ts       # 메모 목록 query
│       └── ...
│
└── types/
    └── api.ts                # API 타입 정의
```

---

## 3. Server Actions 작성 규칙

### 필수 구조

```typescript
"use server";

import type { SomeRequest, SomeResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function someAction(
	request: SomeRequest,
): Promise<SomeResponse> {
	const response = await fetch(`${API_BASE_URL}/api/endpoint`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
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

### 필수 요소

1. **`"use server"` 지시어** (파일 최상단)
2. **타입 안전성**: Request/Response 타입 명시
3. **에러 처리**: response.ok 확인 후 에러 throw
4. **credentials: "include"**: httpOnly 쿠키 전송

### 네이밍 규칙

- **함수명**: `{동사}{명사}Action`
  - 예: `oauthLoginAction`, `createMemoAction`, `updateMemoAction`
- **파일명**: 리소스 단위로 그룹화
  - 예: `auth.ts`, `memos.ts`, `assist.ts`

---

## 4. TanStack Query 통합

### 설치

```bash
yarn add @tanstack/react-query
```

### Provider 설정

```typescript
// src/app/layout.tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

---

## 5. Mutation Hook 작성 규칙

### 파일 위치
`src/hooks/mutations/{리소스명}.ts`

### 기본 구조

```typescript
"use client";

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { someAction } from "@/app/actions/resource";
import type { SomeRequest, SomeResponse } from "@/types/api";

export function useSomeAction(): UseMutationResult<
	SomeResponse,
	Error,
	SomeRequest
> {
	return useMutation({
		mutationFn: someAction,
		onSuccess: (data) => {
			console.log("Success:", data);
		},
		onError: (error) => {
			console.error("Error:", error);
		},
	});
}
```

### 사용 예시

```typescript
'use client'

import { useSomeAction } from '@/hooks/mutations/useSomeAction'

export function SomeComponent() {
  const { mutate, isPending, error, data } = useSomeAction()

  const handleSubmit = () => {
    mutate({ field: 'value' })
  }

  return (
    <button onClick={handleSubmit} disabled={isPending}>
      {isPending ? '처리 중...' : '제출'}
    </button>
  )
}
```

---

## 6. Query Hook 작성 규칙

### 파일 위치
`src/hooks/queries/{리소스명}.ts`

### 기본 구조

```typescript
"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getResourceAction } from "@/app/actions/resource";
import type { ResourceResponse } from "@/types/api";

export function useResource(): UseQueryResult<ResourceResponse[], Error> {
	return useQuery({
		queryKey: ["resource"],
		queryFn: getResourceAction,
		staleTime: 5 * 60 * 1000,
	});
}
```

### Query Keys 규칙

- **일관된 구조**: `[리소스명, 필터/ID]`
- 예시:
  - `['memos']` - 전체 메모 목록
  - `['memos', memoId]` - 특정 메모
  - `['memos', { pinned: true }]` - 필터된 메모

---

## 7. 쿠키 처리 규칙

### 인증 쿠키 자동 처리

Server Actions에서 쿠키 설정:

```typescript
"use server";

import { cookies } from "next/headers";

export async function loginAction(request: LoginRequest) {
	const response = await fetch(`${API_BASE_URL}/api/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});

	const setCookieHeader = response.headers.get("set-cookie");
	if (setCookieHeader) {
		const cookieStore = await cookies();
		const tokenMatch = setCookieHeader.match(/access_token=([^;]+)/);
		const maxAgeMatch = setCookieHeader.match(/Max-Age=(\d+)/);

		if (tokenMatch) {
			cookieStore.set({
				name: "access_token",
				value: tokenMatch[1],
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: maxAgeMatch ? Number.parseInt(maxAgeMatch[1], 10) : 86400,
				path: "/",
			});
		}
	}

	return response.json();
}
```

### 쿠키 삭제

```typescript
export async function logoutAction(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete("access_token");
}
```

---

## 8. 에러 처리 규칙

### Server Action 에러

```typescript
export async function someAction(request: Request): Promise<Response> {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error || `HTTP ${response.status}`);
		}

		return response.json();
	} catch (error) {
		console.error("Server Action Error:", error);
		throw error;
	}
}
```

### Mutation 에러 처리

```typescript
export function useSomeAction() {
	return useMutation({
		mutationFn: someAction,
		onError: (error: Error) => {
			if (error.message.includes("401")) {
				window.location.href = "/login";
			} else {
				console.error("Mutation Error:", error);
			}
		},
	});
}
```

---

## 9. 보안 규칙

### 절대 금지

- ❌ 클라이언트 컴포넌트에서 직접 백엔드 API 호출
- ❌ API 키나 시크릿을 클라이언트 코드에 포함
- ❌ Server Actions 없이 fetch 사용

### 필수 사항

- ✅ 모든 민감한 로직은 Server Actions에서 처리
- ✅ httpOnly 쿠키로 인증 토큰 관리
- ✅ `credentials: "include"` 사용하여 쿠키 전송
- ✅ 환경 변수로 API URL 관리

---

## 10. 성능 최적화

### Query 캐싱 전략

```typescript
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});
```

### Optimistic Updates

```typescript
export function useUpdateMemo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateMemoAction,
		onMutate: async (newMemo) => {
			await queryClient.cancelQueries({ queryKey: ["memos"] });
			const previousMemos = queryClient.getQueryData(["memos"]);

			queryClient.setQueryData(["memos"], (old: Memo[]) =>
				old.map((memo) => (memo.id === newMemo.id ? newMemo : memo)),
			);

			return { previousMemos };
		},
		onError: (err, newMemo, context) => {
			queryClient.setQueryData(["memos"], context?.previousMemos);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["memos"] });
		},
	});
}
```

---

## 11. 디버깅

### React Query Devtools 설치

```bash
yarn add @tanstack/react-query-devtools
```

### Provider에 추가

```typescript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

<QueryClientProvider client={queryClient}>
  {children}
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

## 12. 예시: 완전한 구현

### Server Action

```typescript
// src/app/actions/memos.ts
"use server";

import type { CreateMemoRequest, MemoResponse } from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function createMemoAction(
	request: CreateMemoRequest,
): Promise<MemoResponse> {
	const response = await fetch(`${API_BASE_URL}/api/memos`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
		credentials: "include",
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || "Failed to create memo");
	}

	return response.json();
}
```

### Mutation Hook

```typescript
// src/hooks/mutations/useCreateMemo.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMemoAction } from "@/app/actions/memos";
import type { CreateMemoRequest, MemoResponse } from "@/types/api";

export function useCreateMemo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createMemoAction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["memos"] });
		},
	});
}
```

### 컴포넌트에서 사용

```typescript
// src/components/MemoForm.tsx
"use client";

import { useCreateMemo } from "@/hooks/mutations/useCreateMemo";
import { useState } from "react";

export function MemoForm() {
	const [content, setContent] = useState("");
	const { mutate, isPending, error } = useCreateMemo();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(
			{ content },
			{
				onSuccess: () => {
					setContent("");
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<textarea value={content} onChange={(e) => setContent(e.target.value)} />
			<button type="submit" disabled={isPending}>
				{isPending ? "저장 중..." : "저장"}
			</button>
			{error && <p>에러: {error.message}</p>}
		</form>
	);
}
```

---

## 13. 체크리스트

### Server Action 작성 시
- [ ] `"use server"` 지시어 추가
- [ ] Request/Response 타입 정의
- [ ] `credentials: "include"` 설정
- [ ] 에러 처리 (`response.ok` 확인)
- [ ] 쿠키 처리 (로그인/로그아웃)

### Mutation Hook 작성 시
- [ ] `"use client"` 지시어 추가
- [ ] 타입 안전성 보장 (제네릭)
- [ ] onSuccess, onError 핸들러
- [ ] queryClient.invalidateQueries (캐시 갱신)

### 컴포넌트 사용 시
- [ ] `isPending` 상태 처리
- [ ] `error` 메시지 표시
- [ ] 로딩 중 버튼 비활성화
- [ ] 성공 시 UI 업데이트

---

**마지막 업데이트**: 2026-01-04
