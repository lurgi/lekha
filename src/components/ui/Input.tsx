import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-4 py-3",
        "bg-white border-2 border-neutral-300",
        "text-neutral-900 text-body placeholder:text-neutral-400",
        "rounded-xl",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100",
        "disabled:bg-neutral-100 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}
