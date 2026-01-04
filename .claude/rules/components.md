---
paths: src/components/**/*.tsx
---

# UI 컴포넌트 규칙

이 폴더의 모든 컴포넌트는 `.claude/component-guide.md`와 `.claude/design-system.md`를 따릅니다.

## 필수 구조

```typescript
import { cn } from "@/lib/utils";

interface ComponentProps {
	variant?: "default" | "primary";
	className?: string;
}

export function Component({ variant = "default", className }: ComponentProps) {
	return <div className={cn(baseStyles, variantStyles[variant], className)} />;
}
```

## 필수 요소

- ✅ TypeScript 사용
- ✅ `cn()` 유틸리티로 className 병합
- ✅ HTML 속성 확장 (ButtonHTMLAttributes 등)
- ✅ className prop 제공

## 디자인 시스템 준수

**색상 (design-system.md 참고):**
- Primary: `bg-primary-500`, `text-primary-500`
- Neutral: `bg-neutral-50`, `text-neutral-900`
- 임의의 색상 사용 금지 (`bg-blue-500` ❌)

**타이포그래피:**
- 제목: `text-h1`, `text-h2`, `text-h3`
- 본문: `text-body`, `text-body-sm`

**간격:**
- 패딩: `p-4`, `p-6`
- 마진: `space-y-4`, `space-y-6`

## 접근성

- ✅ `focus:ring-2` 포커스 표시
- ✅ `disabled:opacity-50` 비활성화 상태
- ✅ 시맨틱 HTML 태그 사용

전체 규칙: `.claude/component-guide.md` 참고
