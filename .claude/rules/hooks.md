---
paths: src/hooks/**/*.ts
---

# Custom Hooks 규칙

## Mutation Hooks (src/hooks/mutations/)

TanStack Query의 useMutation을 사용합니다.

```typescript
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { someAction } from "@/app/actions/resource";
import type { Request, Response } from "@/types/api";

export function useSomeAction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: someAction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["resource"] });
		},
	});
}
```

**필수 요소:**
- ✅ `"use client"` 지시어
- ✅ Server Action import
- ✅ 타입 안전성
- ✅ onSuccess에서 캐시 무효화

## Query Hooks (src/hooks/queries/)

TanStack Query의 useQuery를 사용합니다.

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { getResourceAction } from "@/app/actions/resource";

export function useResource() {
	return useQuery({
		queryKey: ["resource"],
		queryFn: getResourceAction,
		staleTime: 5 * 60 * 1000,
	});
}
```

**Query Key 규칙:**
- `['memos']` - 전체 목록
- `['memos', memoId]` - 특정 항목
- `['memos', { filter }]` - 필터된 목록

전체 규칙: `.claude/server-actions.md` 참고
