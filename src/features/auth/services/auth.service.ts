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

import { authRepository } from "@/features/auth/services/auth.repository";

export const authService = {
  login: (payload: LoginInput): Promise<LoginResponse> => authRepository.login(payload),
  register: (payload: RegisterInput): Promise<RegisterResponse> => authRepository.register(payload),
  verifyOtp: (payload: VerifyOtpInput): Promise<VerifyResponse> => authRepository.verifyOtp(payload),
  logout: (): Promise<void> => authRepository.logout(),
  refreshSession: (session: AuthSessionSnapshot) => authRepository.refreshSession(session),
  getSession: () => authRepository.getSession(),
  restoreSession: () => authRepository.restoreSession(),
  revokeSession: () => authRepository.revokeSession(),
  prepareSessionRotation: (payload: SessionRotationPayload) =>
    authRepository.prepareSessionRotation(payload),
};
