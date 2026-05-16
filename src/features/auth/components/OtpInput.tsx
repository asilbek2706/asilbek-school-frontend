import { useEffect, useMemo, useRef } from "react";

type OtpInputProps = {
  value: string;
  length?: number;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export const OtpInput = ({
  value,
  length = 6,
  disabled,
  onChange,
}: OtpInputProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const slots = useMemo(() => {
    const normalized = digitsOnly(value).slice(0, length).padEnd(length, "");

    return Array.from({ length }, (_, index) => normalized[index] ?? "");
  }, [length, value]);

  useEffect(() => {
    const firstEmptyIndex = slots.findIndex((slot) => !slot);
    const focusIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  }, [length, slots]);

  const updateValue = (nextDigits: string[]) => {
    onChange(nextDigits.join("").slice(0, length));
  };

  const handleInput = (index: number, rawValue: string) => {
    const digits = digitsOnly(rawValue);

    if (!digits) {
      const next = [...slots];
      next[index] = "";
      updateValue(next);
      return;
    }

    const next = [...slots];
    digits.split("").forEach((digit, offset) => {
      const targetIndex = index + offset;
      if (targetIndex < length) {
        next[targetIndex] = digit;
      }
    });

    updateValue(next);

    const nextFocusIndex = Math.min(index + digits.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      const next = [...slots];

      if (next[index]) {
        next[index] = "";
        updateValue(next);
        return;
      }

      const previousIndex = Math.max(index - 1, 0);
      next[previousIndex] = "";
      updateValue(next);
      inputRefs.current[previousIndex]?.focus();
    }

    if (event.key === "ArrowLeft") {
      inputRefs.current[Math.max(index - 1, 0)]?.focus();
    }

    if (event.key === "ArrowRight") {
      inputRefs.current[Math.min(index + 1, length - 1)]?.focus();
    }
  };

  const handlePaste = (
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const pasted = digitsOnly(event.clipboardData.getData("text"));

    if (!pasted) {
      return;
    }

    const next = [...slots];
    pasted.split("").forEach((digit, offset) => {
      const targetIndex = index + offset;
      if (targetIndex < length) {
        next[targetIndex] = digit;
      }
    });

    updateValue(next);
    const nextFocusIndex = Math.min(index + pasted.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  return (
    <div className="flex gap-2 sm:gap-3">
      {slots.map((slot, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          value={slot}
          disabled={disabled}
          onChange={(event) => handleInput(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.05] text-center text-lg font-semibold tracking-[0.4em] text-white outline-none transition-all placeholder:text-white/30 focus:border-orange-500/40 focus:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-orange-400/30 disabled:cursor-not-allowed disabled:opacity-60"
        />
      ))}
    </div>
  );
};
