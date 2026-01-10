"use client";

import { MemoCard } from "@/components/memos/MemoCard";
import { MemoInput } from "@/components/memos/MemoInput";

export default function MemosPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <main className="flex-1 mx-auto w-full max-w-prose-narrow px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-h1 font-bold text-neutral-900">메모</h1>
            <p className="text-body text-neutral-700">
              빠르게 생각을 기록하세요
            </p>
          </div>

          <div className="space-y-4">
            <MemoCard
              content="오늘 아침에 떠오른 아이디어: AI 기반 글쓰기 도구에 메모 기능을 추가하면 어떨까? 사용자들이 짧은 생각들을 빠르게 기록하고, 나중에 이를 바탕으로 긴 글을 작성할 수 있을 것 같다."
              createdAt="2시간 전"
            />
            <MemoCard
              content="프로젝트 회의 메모: 디자인 시스템 색상 팔레트 결정. Primary는 코랄 계열, Secondary는 민트 계열로 가기로 함."
              createdAt="5시간 전"
            />
            <MemoCard
              content="읽을 책 목록: 웨스 앤더슨 감독의 영화 미학을 다룬 책 찾아보기. 디자인 시스템에 영감을 줄 수 있을 것 같음."
              createdAt="1일 전"
            />
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 mx-auto w-full max-w-prose-narrow">
        <MemoInput />
      </div>
    </div>
  );
}
