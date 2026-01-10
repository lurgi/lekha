"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface MemoCardProps {
  content: string;
  createdAt: string;
}

export function MemoCard({ content, createdAt }: MemoCardProps) {
  const handleEdit = () => {
    console.log("Edit memo");
  };

  const handleDelete = () => {
    console.log("Delete memo");
  };

  return (
    <Card variant="default">
      <div className="space-y-3">
        <p className="text-body text-neutral-700 leading-relaxed">{content}</p>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
          <span className="text-body-sm text-neutral-400">{createdAt}</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              수정
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
