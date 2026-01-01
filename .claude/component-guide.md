# 컴포넌트 구현 가이드

> Lekha 프로젝트의 일관된 UI 컴포넌트를 만들기 위한 실무 가이드입니다.

---

## 1. 개요

### 이 가이드의 목적
- 새로운 UI 컴포넌트를 만들 때 일관된 패턴을 따르기 위함
- 코드 품질과 유지보수성을 높이기 위한 규칙 제시
- 기존 컴포넌트의 패턴을 분석하여 재사용 가능한 템플릿 제공

### design-system.md와의 관계
- **design-system.md**: 디자인 철학, 색상, 타이포그래피, 레이아웃, 간격 등 **디자인 규칙**
- **component-guide.md** (이 문서): 컴포넌트 구현 시 **코드 패턴과 구조**

> **중요**: 컴포넌트의 스타일(색상, 폰트 크기, 간격 등)은 항상 `design-system.md`를 참고하세요.

---

## 2. 컴포넌트 작성 원칙

### 필수 규칙
1. **TypeScript 사용**: 모든 컴포넌트는 타입 안정성을 위해 TypeScript로 작성
2. **cn 유틸리티 사용**: className 병합 시 `@/lib/utils`의 `cn()` 함수 사용
3. **HTML 속성 확장**: 기본 HTML 요소의 속성을 확장하여 유연성 확보
4. **className prop 제공**: 외부에서 스타일 커스터마이징 가능하도록 허용
5. **디자인 시스템 준수**: `design-system.md`의 색상/타이포/간격 사용

### 권장 사항
- variant 패턴으로 스타일 변형 제공
- 기본값(default) 설정으로 사용성 향상
- baseStyles와 variantStyles 분리로 가독성 확보
- transition 효과는 `transition-all duration-200 ease-out` 사용

---

## 3. 파일 구조 & 네이밍

### 디렉토리 구조
```
src/components/
└── ui/                    # 재사용 가능한 UI 컴포넌트
    ├── Button.tsx
    ├── Input.tsx
    ├── Card.tsx
    └── ...
```

### 네이밍 규칙
- **파일명**: PascalCase (예: `Button.tsx`, `Textarea.tsx`)
- **컴포넌트 함수명**: 파일명과 동일 (export function Button)
- **Props 인터페이스**: `{컴포넌트명}Props` (예: `ButtonProps`)

---

## 4. TypeScript 패턴

### Props 인터페이스 정의

**기본 패턴** (HTML 속성 확장)
```typescript
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}
```

**커스텀 Props** (HTML 요소 아님)
```typescript
interface CardProps {
  variant?: "default" | "accent";
  children: React.ReactNode;
  className?: string;
}
```

### 주요 HTML 속성 타입
- `<button>`: `ButtonHTMLAttributes<HTMLButtonElement>`
- `<input>`: `InputHTMLAttributes<HTMLInputElement>`
- `<textarea>`: `TextareaHTMLAttributes<HTMLTextAreaElement>`
- `<div>`: `HTMLAttributes<HTMLDivElement>`

---

## 5. 스타일링 패턴

### cn 유틸리티 사용

**단일 스타일**
```typescript
<input className={cn(
  "w-full px-4 py-3",
  "bg-white border-2 border-neutral-300",
  "rounded-xl",
  className  // 외부 커스터마이징 허용
)} />
```

**variant 패턴**
```typescript
const baseStyles = "inline-flex items-center justify-center gap-2 ...";

const variantStyles = {
  primary: "bg-primary-500 hover:bg-primary-600 text-white ...",
  secondary: "bg-white border-2 border-neutral-300 ...",
};

<button className={cn(baseStyles, variantStyles[variant], className)} />
```

### design-system.md 참고 방법

#### 색상 사용
`design-system.md`의 **3. 색상 시스템** 참고

```typescript
// ✅ 올바른 예시
"bg-primary-500 hover:bg-primary-600"      // CTA 버튼
"text-neutral-900"                          // 제목
"text-neutral-700"                          // 본문
"border-neutral-300"                        // 테두리

// ❌ 잘못된 예시
"bg-blue-500"                               // 디자인 시스템에 없는 색상
"text-gray-800"                             // neutral 대신 gray 사용
```

#### 타이포그래피 사용
`design-system.md`의 **4. 타이포그래피** 참고

```typescript
// 폰트 크기 클래스
"text-display"      // 48px
"text-h1"           // 36px
"text-h2"           // 30px
"text-body-lg"      // 18px
"text-body"         // 16px (기본)
"text-body-sm"      // 14px
"text-caption"      // 12px

// 폰트 무게
"font-bold"         // 제목
"font-semibold"     // 부제목
"font-medium"       // 버튼, 강조
"font-normal"       // 본문
```

#### 간격 사용
`design-system.md`의 **5. 레이아웃 & 간격** 참고

```typescript
// 컴포넌트 내부 패딩
"p-4"    // 16px - 작은 컴포넌트
"p-6"    // 24px - 중간 컴포넌트 (Card 등)

// 컴포넌트 간 간격
"space-y-4"   // 16px
"space-y-6"   // 24px
"space-y-8"   // 32px
```

### 상태별 스타일

**인터랙션 상태**
```typescript
// 기본 transition
"transition-all duration-200 ease-out"

// Hover
"hover:bg-primary-600"
"hover:border-neutral-400"

// Active
"active:bg-primary-700"

// Focus (접근성 중요!)
"focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"

// Disabled
"disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## 6. 접근성 체크리스트

### 필수 요소
- [ ] **키보드 네비게이션**: Tab, Enter, Space로 조작 가능
- [ ] **Focus 표시**: `focus:ring` 또는 `focus:outline`으로 명확한 포커스 표시
- [ ] **의미 있는 HTML**: 적절한 시맨틱 태그 사용 (`<button>`, `<input>` 등)
- [ ] **레이블 연결**: input에는 label 또는 aria-label 제공
- [ ] **색상 대비**: WCAG AA 기준 (4.5:1) 준수

### 권장 사항
- [ ] **aria 속성**: 필요시 `aria-label`, `aria-describedby` 사용
- [ ] **disabled 처리**: 시각적 표시 + `disabled` 속성
- [ ] **에러 상태**: `aria-invalid`, `aria-errormessage` 사용

---

## 7. 예시 템플릿

### 기본 컴포넌트 템플릿

**Variant가 있는 경우 (Button, Card 등)**
```typescript
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "px-6 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white text-body rounded-full focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    secondary: "px-6 py-3 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-900 text-body border-2 border-neutral-300 hover:border-neutral-400 rounded-full focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
    ghost: "px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 text-body-sm rounded-lg focus:ring-2 focus:ring-neutral-300",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

**단일 스타일 (Input, Textarea 등)**
```typescript
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-4 py-3",
        "bg-white border-2 border-neutral-300",
        "text-neutral-900 text-body placeholder:text-neutral-400",
        "rounded-xl",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100",
        "disabled:bg-neutral-100 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
```

---

## 8. 참고: 기존 구현된 컴포넌트

새로운 컴포넌트를 만들 때 다음 파일들을 참고하세요:

- `src/components/ui/Button.tsx` - variant 패턴, 상태 처리
- `src/components/ui/Input.tsx` - 단일 스타일, focus 처리
- `src/components/ui/Textarea.tsx` - 특수 속성 처리
- `src/components/ui/Card.tsx` - 컨테이너 컴포넌트 패턴

---

**마지막 업데이트**: 2026-01-01
