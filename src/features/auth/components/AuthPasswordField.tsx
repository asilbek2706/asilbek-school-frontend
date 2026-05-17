import type { ChangeEventHandler } from "react";
import { useId } from "react";

import { FormField, PasswordInput } from "@/shared/ui";

type AuthPasswordFieldProps = {
  label: string;
  error?: string;
  hint?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  placeholder?: string;
};

export const AuthPasswordField = ({
  label,
  error,
  hint,
  value,
  onChange,
  autoComplete = "current-password",
  placeholder = "Parol",
}: AuthPasswordFieldProps) => {
  const fieldId = useId();

  return (
    <FormField label={label} error={error} hint={hint} fieldId={fieldId}>
      <PasswordInput
        id={fieldId}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
      />
    </FormField>
  );
};
