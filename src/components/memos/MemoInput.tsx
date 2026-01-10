"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

export function MemoInput() {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, []);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  const handleCancel = () => {
    setContent("");
  };

  const handleSubmit = () => {
    console.log("Submit memo:", content);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 mx-auto w-full max-w-prose-narrow px-4 py-3">
      <div className="bg-white border-2 border-neutral-200 rounded-2xl p-4 shadow-md space-y-3 transition-all duration-200 ease-out">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="메모를 작성하세요..."
          className="min-h-[40px] overflow-hidden"
          autoFocus
        />
        {content && (
          <div className="flex gap-2 justify-end pt-2 border-t border-neutral-200">
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit}>
              작성 완료
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
