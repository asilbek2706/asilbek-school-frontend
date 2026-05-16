import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-5 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-orange-500/40 focus:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-orange-400/30 disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    {...props}
  />
));

Input.displayName = "Input";
