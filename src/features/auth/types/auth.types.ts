export type AuthMethod = "email" | "github";
export type UserRole = "admin" | "teacher" | "student" | "parent";

export type UserPermission =
  | "manage_students"
  | "manage_teachers"
  | "view_dashboard"
  | "manage_attendance"
  | "manage_courses"
  | "manage_notifications";

export type AuthStatus = "idle" | "loading" | "authenticated" | "anonymous" | "verifying";

export type VerificationPurpose = "register" | "login";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  authMethod: AuthMethod;
  isVerified: boolean;
  role?: UserRole;
  permissions?: UserPermission[];
}

export interface AuthSessionSnapshot {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyOtpInput {
  email: string;
  code: string;
  verificationId?: string;
  purpose: VerificationPurpose;
}

export interface AuthMutationResponse {
  message: string;
}

export interface LoginResponse extends AuthMutationResponse {
  session: AuthSessionSnapshot;
}

export interface RegisterResponse extends AuthMutationResponse {
  verificationId: string;
  expiresAt: number;
  debugOtp?: string;
}

export interface VerifyResponse extends AuthMutationResponse {
  user: AuthUser;
}

export interface SessionRotationPayload {
  refreshToken?: string;
}

export interface PendingVerificationContext {
  fullName: string;
  email: string;
  verificationId: string;
  expiresAt: number;
  debugOtp?: string;
}
