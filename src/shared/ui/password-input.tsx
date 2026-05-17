import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={className ? `pr-14 ${className}` : "pr-14"}
        {...props}
      />
      <Button
        type="button"
        aria-label={visible ? "Parolni yashirish" : "Parolni ko‘rsatish"}
        onClick={() => setVisible((current) => !current)}
        className="absolute inset-y-0 right-2 h-10 w-10 rounded-xl bg-transparent p-0 text-white/60 shadow-none hover:bg-white/10 hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
};
