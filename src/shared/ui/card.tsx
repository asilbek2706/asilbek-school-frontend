import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`rounded-[1.75rem] border border-white/10 bg-white/[0.04] ${className}`}>
    {children}
  </div>
);
