"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

export function MemoInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setContent("");
  };

  const handleSubmit = () => {
    console.log("Submit memo:", content);
    setContent("");
    setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isExpanded) {
    return (
      <div className="border-t-2 border-neutral-200 bg-white">
        <button
          type="button"
          onClick={handleExpand}
          className="w-full px-4 py-3 text-left transition-all duration-200 ease-out hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
        >
          <span className="text-body text-neutral-400">새 메모 작성...</span>
        </button>
      </div>
    );
  }

  return (
    <div className="border-t-2 border-neutral-200 bg-white p-4 space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메모를 작성하세요..."
        className="min-h-[80px] max-h-[200px] overflow-y-auto"
        autoFocus
      />
      <div className="flex gap-2 justify-end">
        <Button variant="secondary" size="sm" onClick={handleCancel}>
          취소
        </Button>
        <Button variant="primary" size="sm" onClick={handleSubmit}>
          작성 완료
        </Button>
      </div>
    </div>
  );
}
