# Lekha 프로젝트 개발 규칙

## 프로젝트 개요
**Lekha Server API**: "당신의 생각이 글이 되도록 돕습니다"
- AI 기반 메모/글쓰기 도우미 서비스
- 벡터 검색 기반 시맨틱 유사 메모 검색 기능
- OAuth 소셜 로그인 지원 (Google, Kakao, Naver)

## 백엔드 API 정보
- Base URL (개발): `http://localhost:8080`
- API 문서: `http://localhost:8080/swagger-ui`
- OpenAPI Spec: `http://localhost:8080/api-docs/openapi.json`
- API Version: 0.1.0
- OpenAPI Version: 3.1.0

## 인증 방식
- OAuth 2.0 소셜 로그인 (Google, Kakao, Naver)
- JWT Bearer Token 인증
- Authorization Header: `Authorization: Bearer <access_token>`
- 토큰 만료 시간: 86400초 (24시간)

---

## API 엔드포인트 및 DTO 정의

### 1. Health Check

#### GET /api/health
서버 상태 및 데이터베이스 연결 확인 (인증 불필요)

**Response (200):**
```typescript
interface HealthResponse {
  status: string;      // "ok"
  database: string;    // "connected"
}
```

---

### 2. Users (인증 관리)

#### POST /api/users/oauth-login
OAuth 소셜 로그인 (인증 불필요)

**Request Body:**
```typescript
type OAuthProvider = 'Google' | 'Kakao' | 'Naver';

interface OAuthLoginRequest {
  provider: OAuthProvider;
  provider_user_id: string;  // OAuth 제공자의 고유 사용자 ID
  email: string;
  username: string;
}
```

**Response (200):**
```typescript
interface AuthResponse {
  user: UserResponse;
  access_token: string;
  expires_in: number;  // 초 단위, 일반적으로 86400 (24시간)
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
  created_at: string;  // ISO 8601 format (datetime)
}
```

**Error Responses:**
- 400: 잘못된 요청
- 500: 서버 에러

---

### 3. Memos (메모 관리) - 모든 엔드포인트 인증 필요

#### GET /api/memos
사용자의 모든 메모 목록 조회

**Response (200):**
```typescript
type MemoListResponse = MemoResponse[];

interface MemoResponse {
  id: number;
  user_id: number;
  content: string;
  is_pinned: boolean;
  created_at: string;  // ISO 8601 format
  updated_at: string;  // ISO 8601 format
}
```

**Error Responses:**
- 401: 인증 실패
- 500: 서버 에러

---

#### POST /api/memos
새 메모 생성

**Request Body:**
```typescript
interface CreateMemoRequest {
  content: string;  // 필수
}
```

**Response (201):**
```typescript
interface MemoResponse {
  id: number;
  user_id: number;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}
```

**Error Responses:**
- 400: 잘못된 요청 (content가 비어있거나 유효하지 않음)
- 401: 인증 실패
- 500: 서버 에러

---

#### GET /api/memos/{id}
특정 메모 조회

**Path Parameters:**
- `id` (number): 메모 ID

**Response (200):**
```typescript
interface MemoResponse {
  id: number;
  user_id: number;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}
```

**Error Responses:**
- 401: 인증 실패
- 404: 메모를 찾을 수 없음
- 500: 서버 에러

---

#### PUT /api/memos/{id}
메모 수정

**Path Parameters:**
- `id` (number): 메모 ID

**Request Body:**
```typescript
interface UpdateMemoRequest {
  content: string;  // 필수
}
```

**Response (200):**
```typescript
interface MemoResponse {
  id: number;
  user_id: number;
  content: string;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}
```

**Error Responses:**
- 400: 잘못된 요청
- 401: 인증 실패
- 404: 메모를 찾을 수 없음
- 500: 서버 에러

---

#### DELETE /api/memos/{id}
메모 삭제

**Path Parameters:**
- `id` (number): 메모 ID

**Response (204):**
- No Content (성공 시 응답 본문 없음)

**Error Responses:**
- 401: 인증 실패
- 404: 메모를 찾을 수 없음
- 500: 서버 에러

---

#### PATCH /api/memos/{id}/pin
메모 고정 상태 토글

**Path Parameters:**
- `id` (number): 메모 ID

**Response (200):**
```typescript
interface MemoResponse {
  id: number;
  user_id: number;
  content: string;
  is_pinned: boolean;  // 토글된 상태
  created_at: string;
  updated_at: string;
}
```

**Error Responses:**
- 401: 인증 실패
- 404: 메모를 찾을 수 없음
- 500: 서버 에러

---

### 4. Assist (AI 어시스턴트) - 인증 필요

#### POST /api/assist
AI 어시스턴트 요청 - 프롬프트 기반 AI 제안 및 유사 메모 검색

**Request Body:**
```typescript
interface AssistRequest {
  prompt: string;      // 필수: 사용자 프롬프트
  limit?: number;      // 선택: 유사 메모 개수 (기본값: 5, 최소: 0)
}
```

**Response (200):**
```typescript
interface AssistResponse {
  suggestion: string;           // AI가 생성한 제안 텍스트
  similar_memos: SimilarMemo[]; // 프롬프트와 유사한 기존 메모들
}

interface SimilarMemo {
  id: number;
  content: string;
  created_at: string;  // ISO 8601 format
}
```

**Error Responses:**
- 400: 잘못된 요청 (prompt가 비어있음)
- 401: 인증 실패
- 500: 서버 에러

---

## 공통 에러 응답 스키마

모든 에러 응답은 다음 형식을 따릅니다:

```typescript
interface ErrorResponse {
  error: string;  // 에러 메시지
}
```

**HTTP Status Codes:**
- 200: 성공
- 201: 생성 성공
- 204: 성공 (응답 본문 없음)
- 400: 잘못된 요청
- 401: 인증 실패 (토큰 없음, 만료됨, 유효하지 않음)
- 404: 리소스를 찾을 수 없음
- 500: 서버 내부 에러

---

## 프론트엔드 DTO 구현 규칙

### 1. 타입 정의 위치
- `src/types/api.ts` 또는 `src/lib/types/api.ts`에 모든 API 관련 타입 정의
- Request/Response DTO를 명확히 구분

### 2. 네이밍 컨벤션
- Request DTO: `{Operation}{Resource}Request`
  - 예: `CreateMemoRequest`, `OAuthLoginRequest`
- Response DTO: `{Resource}Response`
  - 예: `MemoResponse`, `AuthResponse`
- Enum/Union Type: PascalCase
  - 예: `OAuthProvider`

### 3. 날짜/시간 처리
- 백엔드에서 ISO 8601 형식 문자열로 전달
- 프론트엔드에서 필요 시 `Date` 객체로 변환
- 예시:
  ```typescript
  const date = new Date(memo.created_at);
  ```

### 4. Optional vs Required
- API 스펙의 `required` 배열에 따라 TypeScript의 optional(`?`) 사용
- Request Body의 optional 필드는 `?`로 표시
- Response의 모든 필드는 기본적으로 required (백엔드 보장)

### 5. 인증 헤더 처리
- 모든 인증이 필요한 API 호출 시 자동으로 헤더 추가
- Axios interceptor 또는 fetch wrapper 사용 권장
- 예시:
  ```typescript
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
  ```

### 6. API 클라이언트 구조
```typescript
// src/lib/api/client.ts - API 클라이언트 기본 설정
// src/lib/api/auth.ts - 인증 관련 API
// src/lib/api/memos.ts - 메모 관련 API
// src/lib/api/assist.ts - AI 어시스턴트 API
```

### 7. 에러 처리
- 모든 API 호출은 try-catch로 감싸기
- ErrorResponse 타입을 활용한 타입 안전 에러 처리
- HTTP status code에 따른 적절한 사용자 피드백

---

## 개발 시 주의사항

1. **인증 토큰 관리**
   - localStorage 또는 secure cookie에 저장
   - 토큰 만료 시간 확인 및 갱신 로직 구현
   - 로그아웃 시 토큰 삭제

2. **API 호출 최적화**
   - React Query 또는 SWR 사용 권장 (캐싱, 재시도, 상태 관리)
   - 불필요한 재호출 방지

3. **타입 안전성**
   - API 응답을 받은 후 반드시 타입 체크
   - unknown 타입 사용 지양, 명확한 타입 정의

4. **환경 변수**
   - API Base URL을 환경 변수로 관리
   - `.env.local`: NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

5. **CORS**
   - 개발 환경에서 CORS 이슈 발생 시 백엔드 설정 확인
   - Next.js의 경우 필요 시 API routes를 프록시로 활용 가능

6. **AI Assist 기능**
   - 벡터 검색 기반이므로 프롬프트 품질이 중요
   - similar_memos 활용하여 UX 개선 (관련 메모 표시)
   - limit 파라미터로 응답 크기 조절

---

## 예시: API 호출 코드

```typescript
// src/lib/api/memos.ts
import { MemoResponse, CreateMemoRequest } from '@/types/api';

export async function createMemo(
  request: CreateMemoRequest,
  accessToken: string
): Promise<MemoResponse> {
  const response = await fetch('http://localhost:8080/api/memos', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create memo');
  }

  return response.json();
}
```

---

## 버전 정보
- API Version: 0.1.0
- 문서 생성일: 2026-01-01
- 최종 업데이트: 2026-01-01
