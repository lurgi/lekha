import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "default" | "accent";
  children: React.ReactNode;
  className?: string;
}

export function Card({ variant = "default", children, className }: CardProps) {
  const variantStyles = {
    default:
      "bg-white border-2 border-neutral-200 hover:border-neutral-300 rounded-2xl p-6 transition-all duration-200 ease-out hover:shadow-md",
    accent:
      "bg-gradient-to-br from-accent-50 to-primary-50 border-2 border-accent-200 rounded-2xl p-6 shadow-sm",
  };

  return (
    <div className={cn(variantStyles[variant], className)}>{children}</div>
  );
}
