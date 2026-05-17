import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { forwardRef } from "react";

import { FormField, Input } from "@/shared/ui";

type AuthTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
};

export const AuthTextField = forwardRef<HTMLInputElement, AuthTextFieldProps>(
  ({ label, error, hint, className, ...props }, ref) => {
    const fieldId = useId();

    return (
      <FormField label={label} error={error} hint={hint} fieldId={fieldId}>
        <Input
          id={fieldId}
          ref={ref}
          className={className}
          aria-invalid={Boolean(error)}
          {...props}
        />
      </FormField>
    );
  }
);

AuthTextField.displayName = "AuthTextField";
