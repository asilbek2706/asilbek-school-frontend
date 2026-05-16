import type { ReactNode } from "react";

type FormFieldProps = {
  label?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export const FormField = ({ label, error, hint, children }: FormFieldProps) => (
  <label className="block space-y-2">
    {label && <span className="text-sm font-medium text-white/80">{label}</span>}
    {children}
    {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
    {error && <p className="text-sm text-red-400">{error}</p>}
  </label>
);
