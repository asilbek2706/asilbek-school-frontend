import axios from "axios";

export type AppErrorCode =
  | "network_error"
  | "validation_error"
  | "unauthorized_error"
  | "timeout_error"
  | "unexpected_error";

export type ValidationIssue = {
  field?: string;
  message: string;
};

export class AppError extends Error {
  code: AppErrorCode;
  status?: number;
  issues?: ValidationIssue[];
  details?: unknown;

  constructor({
    code,
    message,
    status,
    issues,
    details,
  }: {
    code: AppErrorCode;
    message: string;
    status?: number;
    issues?: ValidationIssue[];
    details?: unknown;
  }) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.issues = issues;
    this.details = details;
  }
}

const getMessageFromUnknown = (value: unknown, fallback: string) => {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (value instanceof Error && value.message.trim()) {
    return value.message;
  }

  return fallback;
};

const extractValidationIssues = (data: unknown): ValidationIssue[] | undefined => {
  if (!data || typeof data !== "object") {
    return undefined;
  }

  const candidate = data as {
    issues?: ValidationIssue[];
    errors?: Record<string, string | string[]>;
  };

  if (Array.isArray(candidate.issues) && candidate.issues.length > 0) {
    return candidate.issues;
  }

  if (candidate.errors && typeof candidate.errors === "object") {
    return Object.entries(candidate.errors).flatMap(([field, issue]) =>
      Array.isArray(issue)
        ? issue.map((message) => ({ field, message }))
        : [{ field, message: issue }]
    );
  }

  return undefined;
};

export const isAppError = (error: unknown): error is AppError =>
  error instanceof AppError;

export const normalizeError = (error: unknown): AppError => {
  if (isAppError(error)) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData = error.response?.data as
      | { message?: unknown }
      | undefined;

    if (error.code === "ECONNABORTED") {
      return new AppError({
        code: "timeout_error",
        message: "So‘rov vaqti tugadi. Iltimos, qayta urinib ko‘ring.",
        status,
        details: error,
      });
    }

    if (!error.response) {
      return new AppError({
        code: "network_error",
        message: "Tarmoq xatosi yuz berdi. Internet ulanishini tekshiring.",
        details: error,
      });
    }

    if (status === 401) {
      return new AppError({
        code: "unauthorized_error",
        message: "Sessiya muddati tugadi. Qayta kiring.",
        status,
        details: error,
      });
    }

    const validationIssues = extractValidationIssues(error.response.data);

    if (status === 400 || status === 422 || validationIssues) {
      return new AppError({
        code: "validation_error",
        message:
          getMessageFromUnknown(
            responseData?.message,
            "Kiritilgan ma’lumotlar noto‘g‘ri"
          ),
        status,
        issues: validationIssues,
        details: error,
      });
    }

    return new AppError({
      code: "unexpected_error",
      message: getMessageFromUnknown(
        responseData?.message,
        "Kutilmagan server xatosi yuz berdi"
      ),
      status,
      details: error,
    });
  }

  if (error instanceof Error) {
    const message = getMessageFromUnknown(error.message, "Kutilmagan xato yuz berdi");

    return new AppError({
      code: "unexpected_error",
      message,
      details: error,
    });
  }

  return new AppError({
    code: "unexpected_error",
    message: "Kutilmagan xato yuz berdi",
    details: error,
  });
};

export const getErrorMessage = (error: unknown, fallback = "Kutilmagan xato yuz berdi") =>
  normalizeError(error).message || fallback;

export const isRetryableError = (error: unknown) => {
  const normalized = normalizeError(error);

  return normalized.code === "network_error" || normalized.code === "timeout_error";
};
