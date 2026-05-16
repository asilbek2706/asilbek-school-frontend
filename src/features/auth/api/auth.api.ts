import { api } from "@/shared/services/api";

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
    api.post<LoginResponse>("/auth/login", payload).then((response) => response.data),
  register: (payload: RegisterInput) =>
    api.post<RegisterResponse>("/auth/register", payload).then((response) => response.data),
  verifyOtp: (payload: VerifyOtpInput) =>
    api.post<VerifyResponse>("/auth/verify-otp", payload).then((response) => response.data),
  logout: () => api.post<void>("/auth/logout").then((response) => response.data),
};
