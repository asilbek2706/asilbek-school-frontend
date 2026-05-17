import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
};

export const SectionTitle = ({ eyebrow, title, description }: SectionTitleProps) => (
  <div className="space-y-3">
    {eyebrow && <div className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">{eyebrow}</div>}
    <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{title}</h2>
    {description && <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-base">{description}</p>}
  </div>
);
