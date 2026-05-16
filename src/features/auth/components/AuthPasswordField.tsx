import { useState } from "react";
import type { ChangeEventHandler } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Button, FormField, Input } from "@/shared/ui";

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
  const [visible, setVisible] = useState(false);

  return (
    <FormField label={label} error={error} hint={hint}>
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="pr-14"
        />
        <Button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-2 h-10 w-10 rounded-xl bg-transparent p-0 text-white/60 shadow-none hover:bg-white/10 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>
    </FormField>
  );
};
