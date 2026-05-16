import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import { FormField, Input } from "@/shared/ui";

type AuthTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const AuthTextField = forwardRef<HTMLInputElement, AuthTextFieldProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <FormField label={label} error={error} hint={hint}>
      <Input ref={ref} className={className} {...props} />
    </FormField>
  )
);

AuthTextField.displayName = "AuthTextField";
