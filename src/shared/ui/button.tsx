import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(249,115,22,0.24)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Spinner className="h-4 w-4" />
          Yuklanmoqda...
        </span>
      ) : (
        children
      )}
    </button>
  )
);

Button.displayName = "Button";
