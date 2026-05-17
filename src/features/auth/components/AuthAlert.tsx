import type { ReactNode } from "react";

type AuthAlertProps = {
  tone?: "success" | "error" | "info";
  children: ReactNode;
};

const tones = {
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-200",
  error: "border-red-500/20 bg-red-500/10 text-red-200",
  info: "border-white/10 bg-white/[0.05] text-white/70",
};

export const AuthAlert = ({ tone = "info", children }: AuthAlertProps) => (
  <div role="alert" aria-live="polite" className={`rounded-2xl border px-4 py-3 text-sm ${tones[tone]}`}>
    {children}
  </div>
);
