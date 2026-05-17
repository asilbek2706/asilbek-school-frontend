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

import { env } from "@/shared/config/env";
import { authApi } from "@/features/auth/api/auth.api";
import { authMockApi } from "@/features/auth/api/auth.mock";

type AuthGateway = {
  login: (payload: LoginInput) => Promise<LoginResponse>;
  register: (payload: RegisterInput) => Promise<RegisterResponse>;
  verifyOtp: (payload: VerifyOtpInput) => Promise<VerifyResponse>;
  logout: () => Promise<void>;
  refreshSession: (session: AuthSessionSnapshot) => Promise<AuthSessionSnapshot>;
  getSession: () => Promise<AuthSessionSnapshot | null>;
  restoreSession: () => Promise<AuthSessionSnapshot | null>;
  revokeSession: () => Promise<void>;
  prepareSessionRotation: (payload: SessionRotationPayload) => Promise<SessionRotationPayload>;
};

const useMockAuth = env.USE_MOCK;

const gateway: AuthGateway = useMockAuth
  ? authMockApi
  : authApi;

export const authRepository = {
  login: (payload: LoginInput) => gateway.login(payload),
  register: (payload: RegisterInput) => gateway.register(payload),
  verifyOtp: (payload: VerifyOtpInput) => gateway.verifyOtp(payload),
  logout: () => gateway.logout(),
  refreshSession: (session: AuthSessionSnapshot) => gateway.refreshSession(session),
  getSession: () => gateway.getSession(),
  restoreSession: () => gateway.restoreSession(),
  revokeSession: () => gateway.revokeSession(),
  prepareSessionRotation: (payload: SessionRotationPayload) =>
    gateway.prepareSessionRotation(payload),
};
