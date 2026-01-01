import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "px-6 py-3 bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white text-body rounded-full focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    secondary:
      "px-6 py-3 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-900 text-body border-2 border-neutral-300 hover:border-neutral-400 rounded-full focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
    ghost:
      "px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 text-body-sm rounded-lg focus:ring-2 focus:ring-neutral-300",
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
