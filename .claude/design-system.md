# Lekha 디자인 시스템

당신은 작가를 위한 AI 기반 글쓰기 서비스의 디자인 시스템을 참고하여 일관된 UI를 만드는 전문가입니다.

---

## 1. 서비스 컨텍스트

**서비스 목적**
- 작가들이 작은 메모를 통해 개인화된 AI 추천을 받아 완성된 글을 만드는 서비스
- 주요 사용자 행동: 글쓰기, 메모 작성, AI와의 상호작용

**타겟 사용자**
- 작가 (날카롭지 않고 따뜻하고 부드러운 분위기 선호)
- 창의적이고 감성적인 사용자

**기술 스택**
- Framework: Next.js 16
- Styling: Tailwind CSS v4
- Icons: lucide-react
- 다크모드: 미지원

---

## 2. 디자인 철학

**목적 있는 디자인 (Purposeful Design)**
- 모든 UI 요소는 명확한 목적과 사용자 가치를 제공해야 함
- "이 요소가 없으면 사용자 경험이 나빠지는가?" 질문하기
- 목적 없는 장식, 불필요한 컨테이너, 의미 없는 래퍼는 나쁜 UX를 만듦
- 시각적 아름다움보다 기능과 목적이 우선

**웨스 앤더슨 스타일 적용**
- 파스텔 톤의 부드러운 색상
- 센터 정렬 중심의 레이아웃 (완벽한 대칭보다는 centered UI)
- 평면적이고 동화책 같은 느낌
- 복고풍 감성
- 섬세한 디테일과 의도적인 배치

**모바일 우선 설계**
- 최대 너비 제한으로 단조롭고 집중력 높은 UI (Claude AI처럼)
- 태블릿/모바일 최적화
- 데스크톱은 중앙 정렬로 여백 활용

**커뮤니티 감각 (Meetup 레퍼런스)**
- 친근하고 접근하기 쉬운 인터페이스
- 명확한 행동 유도 버튼

---

## 3. 색상 시스템

### Tailwind CSS v4 설정 방법

프로젝트의 `src/app/globals.css` 파일에 다음과 같이 색상을 정의합니다:

```css
@theme {
  /* Primary - 따뜻한 코랄/피치 */
  --color-primary-50: #FFF5F2;
  --color-primary-100: #FFE8E0;
  --color-primary-200: #FFCFC1;
  --color-primary-300: #FFB5A0;
  --color-primary-400: #FF9B7F;
  --color-primary-500: #FF8166;
  --color-primary-600: #E66B52;
  --color-primary-700: #CC553E;
  --color-primary-800: #B33F2A;
  --color-primary-900: #992916;

  /* Secondary - 부드러운 민트/세이지 */
  --color-secondary-50: #F2F9F7;
  --color-secondary-100: #E0F2ED;
  --color-secondary-200: #C1E5DB;
  --color-secondary-300: #A0D8C9;
  --color-secondary-400: #7FCBB7;
  --color-secondary-500: #5EBEA5;
  --color-secondary-600: #4A9B86;
  --color-secondary-700: #367867;
  --color-secondary-800: #225548;
  --color-secondary-900: #0E3229;

  /* Accent - 부드러운 라벤더 */
  --color-accent-50: #F8F5FF;
  --color-accent-100: #F0E8FF;
  --color-accent-200: #E1D1FF;
  --color-accent-300: #D1BAFF;
  --color-accent-400: #C2A3FF;
  --color-accent-500: #B38CFF;
  --color-accent-600: #9970E6;
  --color-accent-700: #7F54CC;
  --color-accent-800: #6538B3;
  --color-accent-900: #4B1C99;

  /* Neutral - 웜 그레이 */
  --color-neutral-50: #FAF9F7;
  --color-neutral-100: #F5F3F0;
  --color-neutral-200: #E8E5E0;
  --color-neutral-300: #DBD7D0;
  --color-neutral-400: #CEC9C0;
  --color-neutral-500: #B8B3A8;
  --color-neutral-600: #9A9589;
  --color-neutral-700: #7C776A;
  --color-neutral-800: #5E594B;
  --color-neutral-900: #403B2C;
}
```

### 색상 사용 규칙

- **Primary**: CTA 버튼, 중요한 액션, 하이라이트
- **Secondary**: 보조 버튼, 성공 상태, 긍정적 피드백
- **Accent**: 특별한 강조, 뱃지, 태그
- **Neutral**: 텍스트, 테두리, 배경

### 접근성

- 모든 텍스트는 WCAG AA 기준 준수 (4.5:1 이상)
- Primary/Secondary 500은 흰 배경에서 사용 가능
- Neutral 700 이상은 본문 텍스트로 사용

---

## 4. 타이포그래피

### 폰트 설정 (Tailwind v4)

```css
@theme {
  /* 폰트 패밀리 */
  --font-sans: 'Pretendard Variable', 'Inter', system-ui, sans-serif;
  --font-serif: 'Noto Serif KR', Georgia, serif;

  /* 폰트 크기 */
  --font-size-display: 3rem;          /* 48px */
  --font-size-display--line-height: 1.2;
  --font-size-display--letter-spacing: -0.02em;

  --font-size-h1: 2.25rem;            /* 36px */
  --font-size-h1--line-height: 1.3;
  --font-size-h1--letter-spacing: -0.01em;

  --font-size-h2: 1.875rem;           /* 30px */
  --font-size-h2--line-height: 1.4;
  --font-size-h2--letter-spacing: -0.01em;

  --font-size-h3: 1.5rem;             /* 24px */
  --font-size-h3--line-height: 1.5;

  --font-size-h4: 1.25rem;            /* 20px */
  --font-size-h4--line-height: 1.5;

  --font-size-body-lg: 1.125rem;      /* 18px */
  --font-size-body-lg--line-height: 1.7;

  --font-size-body: 1rem;             /* 16px */
  --font-size-body--line-height: 1.7;

  --font-size-body-sm: 0.875rem;      /* 14px */
  --font-size-body-sm--line-height: 1.6;

  --font-size-caption: 0.75rem;       /* 12px */
  --font-size-caption--line-height: 1.5;
}
```

### 사용 규칙

- **제목**: `font-sans` + `font-semibold` 또는 `font-bold`
- **본문**: `font-sans` + `font-normal`
- **강조**: `font-serif` (선택적, 특별한 경우)
- **색상**: `text-neutral-900` (제목), `text-neutral-700` (본문)

---

## 5. 레이아웃 & 간격

### 컨테이너 설정 (Tailwind v4)

```css
@theme {
  --max-width-prose-narrow: 45rem;   /* 720px - 글쓰기 영역 */
  --max-width-content: 60rem;        /* 960px - 일반 콘텐츠 */
}
```

### 레이아웃 패턴

**기본 페이지 레이아웃**
```jsx
<div className="min-h-screen bg-neutral-50">
  <main className="mx-auto max-w-content px-4 py-8 md:px-6 md:py-12">
    {/* 콘텐츠 */}
  </main>
</div>
```

**글쓰기 전용 레이아웃**
```jsx
<div className="min-h-screen bg-white">
  <main className="mx-auto max-w-prose-narrow px-4 py-12 md:px-6">
    {/* 에디터 */}
  </main>
</div>
```

### 간격 시스템

- **컴포넌트 내부 패딩**: `p-4` (16px), `p-6` (24px)
- **컴포넌트 간 간격**: `space-y-4` (16px), `space-y-6` (24px), `space-y-8` (32px)
- **섹션 간 간격**: `space-y-12` (48px), `space-y-16` (64px)

---

## 6. 인터랙션 & 애니메이션

### 애니메이션 설정 (Tailwind v4)

```css
@theme {
  --transition-duration-200: 200ms;
  --transition-duration-300: 300ms;
  --transition-timing-function-out: cubic-bezier(0.33, 1, 0.68, 1);
}
```

### 사용 원칙

- **기본 transition**: `transition-all duration-200 ease-out`
- **Hover**: 색상 변화, 미세한 scale (`hover:scale-105`)
- **Focus**: ring으로 명확한 포커스 표시 (`focus:ring-2 focus:ring-primary-500`)
- **애니메이션은 subtle하게** (웨스 앤더슨 스타일의 절제미)

---

## 7. 반응형 규칙

### 브레이크포인트

- **sm**: 640px (모바일 가로)
- **md**: 768px (태블릿)
- **lg**: 1024px (작은 데스크톱) - 최대 여기까지만 고려

### 모바일 우선 패턴

```jsx
// 모바일: 전체 너비, 데스크톱: 중앙 정렬 + 최대 너비
<div className="w-full max-w-content mx-auto px-4 md:px-6">

// 모바일: 세로 스택, 태블릿 이상: 가로 배치
<div className="flex flex-col md:flex-row gap-4">

// 폰트 크기도 반응형
<h1 className="text-h2 md:text-h1">
```

---

## 8. AI 생성 콘텐츠 톤앤매너

### 글 작성 AI의 어조

- 따뜻하고 격려하는 톤
- 존댓말 사용 (작가를 존중)
- 예: "좋은 시작이에요", "이 부분을 조금 더 발전시켜볼까요?"

### 시스템 메시지

- 간결하고 명확하게
- 이모지 최소화 (필요시 1개)
- 예: "저장 중...", "완료!", "다시 시도해주세요"

### AI 추천 표현

- 제안하는 톤 (강요하지 않음)
- 예: "이런 방향은 어떨까요?", "~하면 더 좋을 것 같아요"

---

## 9. 구현 시 주의사항

1. **일관성**: 모든 컴포넌트가 위 규칙을 따라야 함
2. **접근성**: 키보드 네비게이션, 스크린 리더 고려
3. **성능**: Tailwind의 JIT 모드 활용, 불필요한 클래스 제거
4. **확장성**: 새로운 색상 추가 시 50-900 전체 팔레트 생성

---

## 컴포넌트 사용 가이드

이 디자인 시스템을 바탕으로 구현된 UI 컴포넌트들은 `src/components/ui/` 디렉토리에 위치합니다.

**사용 가능한 컴포넌트**:
- `Button`: Primary, Secondary, Ghost 변형
- `Input`: 텍스트 입력
- `Textarea`: 글쓰기용 텍스트 영역
- `Card`: 기본, Accent 변형

각 컴포넌트는 위의 디자인 원칙을 따르며, props를 통해 커스터마이징할 수 있습니다.

---

## 10. 로그인/인증 페이지 가이드라인

### 레퍼런스
- **Notion 로그인 화면**: 깔끔하고 넓은 느낌, 미니멀한 디자인

### 디자인 원칙

**1. 목적 있는 UI (Purposeful Design)**
- 모든 UI 요소는 명확한 목적과 가치를 가져야 함
- 목적 없는 컨테이너나 장식 요소는 사용하지 않기
- 예: 버튼을 Card로 감싸는 것은 그룹핑이나 시각적 계층에 기여하지 않으므로 불필요
- **핵심**: "이 요소가 없으면 사용자 경험이 나빠지는가?"를 항상 질문

**2. 의미 있는 그룹핑**
- 컨테이너는 관련 요소를 논리적으로 묶을 때만 사용
- 단순히 "보기 좋게" 하기 위한 래퍼는 가치를 제공하지 않음
- 시각적 그룹핑이 필요하다면 간격(spacing)으로 해결

**3. 넓고 여유로운 느낌 (Spacious & Airy)**
- 넉넉한 여백 사용 (`space-y-10` 이상)
- 헤더와 버튼 영역 간격 충분히 확보
- 컨테이너는 `max-w-md` 정도로 적당한 너비 유지

**4. 타이포그래피 일관성**
- 한 페이지에서 serif와 sans-serif 혼용하지 않기
- 폰트 패밀리는 통일 (권장: sans-serif)
- 명확한 시각적 계층 (제목 → 태그라인)

**5. 간결함**
- 핵심 메시지만 전달
- 불필요한 서브텍스트 제거
- 행동 유도(CTA) 요소에 집중

### 구현 패턴

**권장 패턴 ✅**

```jsx
<div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
  <div className="w-full max-w-md space-y-12">
    {/* 헤더 */}
    <div className="text-center space-y-8">
      <h1 className="text-display font-bold text-neutral-900">
        서비스명
      </h1>
      <p className="text-h3 md:text-h2 font-semibold text-primary-600">
        핵심 태그라인
      </p>
    </div>

    {/* 버튼들 - Card 없이 직접 배치 */}
    <div className="space-y-3">
      {/* 로그인 버튼들 */}
    </div>

    {/* 에러 메시지 */}
    {error && (
      <p className="text-body-sm text-center text-red-600">
        {error}
      </p>
    )}
  </div>
</div>
```

**피해야 할 패턴 ❌**
- 버튼을 Card로 감싸기 → 목적과 가치 없는 UI로써 좋지 않은 UX 제공
- 불필요한 설명 텍스트 추가 → 핵심 메시지 희석
- 한 페이지에서 serif와 sans 혼용 → 일관성 부족
- 목적 없는 장식 요소 → 사용자 경험에 기여하지 않음

### 간격 가이드

- **전체 컨테이너**: `space-y-12` (헤더와 버튼 영역 간격)
- **헤더 내부**: `space-y-8` (제목과 태그라인 간격)
- **버튼 간격**: `space-y-3` (버튼들 사이)

### 색상 활용

- **배경**: `bg-neutral-50` (부드러운 웜 그레이)
- **제목**: `text-neutral-900` (진한 텍스트)
- **태그라인**: `text-primary-600` (브랜드 코랄 색상)
- **에러**: `text-red-600` (명확한 피드백)

### 실제 예시

Lekha 로그인 페이지는 이 가이드라인을 따릅니다:
- 제목 "Lekha"와 태그라인 "당신의 생각이 💭 글이 되도록 ✏️"로 구성
- **Card 없이 로그인 버튼 직접 배치**: Card는 그룹핑이나 시각적 계층에 기여하지 않으므로 제거
- Sans-serif 폰트로 통일: 일관된 타이포그래피로 전문성 확보
- 넉넉한 여백: 간격(spacing)으로 시각적 그룹핑 해결

---

**마지막 업데이트**: 2026-01-07
