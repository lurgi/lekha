# 컴포넌트 구현 가이드 (임시)

> **주의**: 이 파일은 컴포넌트 구현 중에만 참고하는 임시 가이드입니다.
> 모든 컴포넌트 구현이 완료되면 이 파일 전체를 삭제하세요.

---

## 구현 진행 상황

### 완료된 컴포넌트
- [x] Button (Primary, Secondary, Ghost) → `src/components/ui/Button.tsx`
- [x] Input → `src/components/ui/Input.tsx`
- [x] Textarea → `src/components/ui/Textarea.tsx`
- [x] Card (기본, 강조) → `src/components/ui/Card.tsx`

### 미구현 컴포넌트
- [ ] Toast/Notification
- [ ] Loading Spinner
- [ ] Progress Indicator
- [ ] Badge & Tag

---

## 1. 피드백 UI

### Toast/Notification

**성공 Toast**
```jsx
<div className="
  flex items-center gap-3 px-4 py-3
  bg-secondary-500 text-white
  rounded-xl shadow-lg
  animate-in slide-in-from-top duration-300
">
  <CheckCircle className="w-5 h-5" />
  <span className="font-medium text-body-sm">저장되었습니다</span>
</div>
```

**에러 Toast**
```jsx
<div className="
  flex items-center gap-3 px-4 py-3
  bg-red-500 text-white
  rounded-xl shadow-lg
  animate-in slide-in-from-top duration-300
">
  <AlertCircle className="w-5 h-5" />
  <span className="font-medium text-body-sm">오류가 발생했습니다</span>
</div>
```

### Loading Spinner
```jsx
<div className="
  inline-block w-5 h-5
  border-2 border-neutral-300 border-t-primary-500
  rounded-full
  animate-spin
" />
```

### Progress Indicator
```jsx
<div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
  <div className="h-full bg-primary-500 transition-all duration-300 ease-out"
       style={{ width: '60%' }} />
</div>
```

---

## 2. Badge & Tag

```jsx
<span className="
  inline-flex items-center gap-1 px-3 py-1
  bg-accent-100 text-accent-700
  text-body-sm font-medium
  rounded-full
">
  AI 추천
</span>
```

---

## 남은 작업

1. 미구현 컴포넌트 완료 시 체크리스트에 [x] 표시 및 해당 섹션 제거
2. 모든 컴포넌트 구현 완료 시 이 파일 전체 삭제
3. `design-system.md`는 영구 보관

---

**작성일**: 2026-01-01
