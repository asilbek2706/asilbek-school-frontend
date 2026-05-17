import { httpClient } from "@/shared/services/api";

import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
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
};
