import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant,
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "gap-2 px-4 py-2 text-body-sm",
    md: "gap-2 px-5 py-2.5 text-body",
    lg: "gap-3 px-6 py-3.5 text-body",
  };

  const variantStyles = {
    primary:
      "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white rounded-full focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    secondary:
      "bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-900 border-2 border-neutral-300 hover:border-neutral-400 rounded-full focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
    ghost:
      "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg focus:ring-2 focus:ring-neutral-300",
  };

  return (
    <button
      className={cn(
        baseStyles,
        sizeStyles[size],
        variant && variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
