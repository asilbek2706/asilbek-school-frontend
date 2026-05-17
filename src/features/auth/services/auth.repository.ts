import type {
  AuthSessionSnapshot,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  VerifyOtpInput,
  VerifyResponse,
} from "@/features/auth/types/auth.types";

import { authMockApi } from "@/features/auth/api/auth.mock";

type AuthGateway = {
  login: (payload: LoginInput) => Promise<LoginResponse>;
  register: (payload: RegisterInput) => Promise<RegisterResponse>;
  verifyOtp: (payload: VerifyOtpInput) => Promise<VerifyResponse>;
  logout: () => Promise<void>;
  refreshSession: (session: AuthSessionSnapshot) => Promise<AuthSessionSnapshot>;
};

const useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH !== "false";

const gateway: AuthGateway = useMockAuth
  ? authMockApi
  : authMockApi;

export const authRepository = {
  login: (payload: LoginInput) => gateway.login(payload),
  register: (payload: RegisterInput) => gateway.register(payload),
  verifyOtp: (payload: VerifyOtpInput) => gateway.verifyOtp(payload),
  logout: () => gateway.logout(),
  refreshSession: (session: AuthSessionSnapshot) => gateway.refreshSession(session),
};
