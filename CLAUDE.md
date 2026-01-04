# Lekha 프로젝트

> AI 기반 글쓰기 서비스

## 프로젝트 구조

### 핵심 디렉토리
- `src/app/` - Next.js App Router (pages, layouts, actions)
- `src/components/` - React 컴포넌트 (ui/, auth/)
- `src/types/` - TypeScript 타입 정의
- `src/hooks/` - Custom Hooks (mutations/, queries/)
- `.claude/` - 프로젝트 가이드 및 설정

### 제외 디렉토리
- `node_modules/` - 의존성 패키지
- `.next/` - Next.js 빌드 결과
- `.git/` - Git 메타데이터

## 개발 환경

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **State**: TanStack Query
- **Backend**: http://localhost:8080
- **인증**: httpOnly Cookie (JWT)

## 참고 문서

모든 구현은 다음 가이드를 따릅니다:

1. **디자인**: `.claude/design-system.md`
   - 웨스 앤더슨 스타일
   - 색상: Primary(코랄), Secondary(민트), Accent(라벤더)
   - 타이포그래피, 간격, 레이아웃 규칙

2. **컴포넌트**: `.claude/component-guide.md`
   - TypeScript 패턴
   - variant 시스템
   - 접근성 체크리스트

3. **API**: `.claude/api-spec.md`
   - Backend API 명세
   - httpOnly Cookie 인증
   - Request/Response DTO

4. **Server Actions**: `.claude/server-actions.md`
   - Server Actions + TanStack Query 필수
   - 파일 구조 및 네이밍
   - 에러 처리 및 보안 규칙

## 코딩 규칙

- **주석 금지**: 코드는 자명해야 함
- **타입 안전성**: 모든 함수에 타입 명시
- **Server Actions**: 클라이언트에서 직접 fetch 금지
- **디자인 시스템 준수**: 임의의 색상/간격 사용 금지
