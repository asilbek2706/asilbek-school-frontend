import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import { normalizeError } from "@/shared/errors";

export const applyAuthError = <TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>
) => {
  const appError = normalizeError(error);

  appError.issues?.forEach((issue) => {
    if (issue.field) {
      setError(issue.field as Path<TFieldValues>, {
        type: appError.code,
        message: issue.message,
      });
    }
  });

  return appError.message;
};
