import type { Ref, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full min-h-[200px] px-4 py-3",
        "bg-white border-2 border-neutral-200",
        "text-neutral-900 text-body-lg leading-relaxed placeholder:text-neutral-400",
        "rounded-xl resize-none",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-50",
        "disabled:bg-neutral-100 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
