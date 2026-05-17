import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export const Badge = ({ children }: BadgeProps) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-white/70">
    {children}
  </span>
);
