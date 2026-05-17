import { httpClient } from "@/shared/services/api";

import type {
  AuthSessionSnapshot,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  SessionRotationPayload,
  VerifyOtpInput,
  VerifyResponse,
} from "@/features/auth/types/auth.types";

export const authApi = {
  login: (payload: LoginInput) =>
    httpClient.post<LoginResponse>("/auth/login", payload).then((response) => response.data),
  register: (payload: RegisterInput) =>
    httpClient.post<RegisterResponse>("/auth/register", payload).then((response) => response.data),
  verifyOtp: (payload: VerifyOtpInput) =>
    httpClient.post<VerifyResponse>("/auth/verify-otp", payload).then((response) => response.data),
  logout: () => httpClient.post<void>("/auth/logout").then((response) => response.data),
  refreshSession: (session: AuthSessionSnapshot) =>
    httpClient.post<AuthSessionSnapshot>("/auth/refresh", session).then((response) => response.data),
  getSession: () =>
    httpClient.get<AuthSessionSnapshot | null>("/auth/session").then((response) => response.data),
  restoreSession: () =>
    httpClient.get<AuthSessionSnapshot | null>("/auth/session/restore").then((response) => response.data),
  revokeSession: () => httpClient.post<void>("/auth/session/revoke").then((response) => response.data),
  prepareSessionRotation: (payload: SessionRotationPayload) =>
    httpClient
      .post<SessionRotationPayload>("/auth/session/prepare-rotation", payload)
      .then((response) => response.data),
};
