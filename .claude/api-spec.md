# Lekha Backend API Specification

## 프로젝트 개요
**Lekha Server API**: "당신의 생각이 글이 되도록 돕습니다"
- AI 기반 메모/글쓰기 도우미 서비스
- 벡터 검색 기반 시맨틱 유사 메모 검색 기능
- OAuth 소셜 로그인 지원 (Google, Kakao, Naver)

## 백엔드 API 정보
- Base URL (개발): `http://localhost:8080`
- API Version: 0.1.0
- OpenAPI Version: 3.1.0

## 인증 방식
- OAuth 2.0 소셜 로그인 (Google, Kakao, Naver)
- JWT 토큰을 httpOnly Cookie로 전송
- Cookie Name: `access_token`
- Cookie 설정: `HttpOnly; Secure; SameSite=lax; Max-Age={expires_in}`
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
  expires_in: number;
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
  created_at: string;
}
```

**Response Headers:**
```
Set-Cookie: access_token=<jwt_token>; HttpOnly; Secure; SameSite=lax; Max-Age=86400; Path=/
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

## API 호출 예시

### Health Check
```bash
curl -X GET http://localhost:8080/api/health
```

### OAuth Login
```bash
curl -X POST http://localhost:8080/api/users/oauth-login \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "Google",
    "provider_user_id": "123456789",
    "email": "user@example.com",
    "username": "John Doe"
  }'
```

### Get All Memos
```bash
curl -X GET http://localhost:8080/api/memos \
  --cookie "access_token=<jwt_token>"
```

### Create Memo
```bash
curl -X POST http://localhost:8080/api/memos \
  -H "Content-Type: application/json" \
  --cookie "access_token=<jwt_token>" \
  -d '{
    "content": "새로운 메모 내용"
  }'
```

### Update Memo
```bash
curl -X PUT http://localhost:8080/api/memos/1 \
  -H "Content-Type: application/json" \
  --cookie "access_token=<jwt_token>" \
  -d '{
    "content": "수정된 메모 내용"
  }'
```

### Delete Memo
```bash
curl -X DELETE http://localhost:8080/api/memos/1 \
  --cookie "access_token=<jwt_token>"
```

### Toggle Memo Pin
```bash
curl -X PATCH http://localhost:8080/api/memos/1/pin \
  --cookie "access_token=<jwt_token>"
```

### AI Assist
```bash
curl -X POST http://localhost:8080/api/assist \
  -H "Content-Type: application/json" \
  --cookie "access_token=<jwt_token>" \
  -d '{
    "prompt": "프로젝트 아이디어가 떠올랐어",
    "limit": 3
  }'
```

---

## 버전 정보
- API Version: 0.1.0
- 문서 생성일: 2026-01-26
- 최종 업데이트: 2026-01-26
