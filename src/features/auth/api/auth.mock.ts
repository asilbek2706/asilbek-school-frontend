import type {
  AuthSessionSnapshot,
  AuthUser,
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  VerifyOtpInput,
  VerifyResponse,
} from "@/features/auth/types/auth.types";
import { AppError } from "@/shared/errors";

import { buildAvatarUrl, delay } from "@/features/auth/utils/auth-session";

type StoredUser = AuthUser & {
  password: string;
};

type PendingRegistration = {
  fullName: string;
  email: string;
  password: string;
  verificationId: string;
  code: string;
  expiresAt: number;
};

const MOCK_DELAY = 850;
const MOCK_OTP_CODE = "123456";
const users = new Map<string, StoredUser>();
const pendingRegistrations = new Map<string, PendingRegistration>();

const seedDemoUser = () => {
  const email = "demo@asilbek.uz";

  if (!users.has(email)) {
    users.set(email, {
      id: "demo-user",
      fullName: "Asilbek Demo",
      email,
      avatarUrl: buildAvatarUrl("Asilbek Demo", email),
      authMethod: "email",
      isVerified: true,
      password: "Demo12345",
    });
  }
};

seedDemoUser();

const normalizeEmail = (email: string) => email.trim().toLowerCase();
const createOtpCode = () => MOCK_OTP_CODE;
const createId = () => crypto.randomUUID();

const createSession = (user: AuthUser): AuthSessionSnapshot => ({
  user,
  accessToken: crypto.randomUUID(),
  refreshToken: crypto.randomUUID(),
  expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
});

const toPublicUser = (storedUser: StoredUser): AuthUser => {
  const { password: _password, ...user } = storedUser;
  return user;
};

const throwValidationError = (message: string, issues?: Array<{ field?: string; message: string }>) => {
  throw new AppError({
    code: "validation_error",
    message,
    issues,
  });
};

export const authMockApi = {
  async login(payload: LoginInput): Promise<LoginResponse> {
    await delay(MOCK_DELAY);

    const email = normalizeEmail(payload.email);
    const storedUser = users.get(email);

    if (!storedUser) {
      throwValidationError("Bunday email topilmadi", [{ field: "email", message: "Email ro‘yxatdan o‘tmagan" }]);
    }

    const verifiedUser = storedUser!;

    if (!verifiedUser.isVerified) {
      throwValidationError("Akkount hali tasdiqlanmagan", [{ field: "email", message: "Email tasdiqlanmagan" }]);
    }

    if (verifiedUser.password !== payload.password) {
      throwValidationError("Email yoki parol noto‘g‘ri", [{ field: "password", message: "Parol noto‘g‘ri" }]);
    }

    const session = createSession(toPublicUser(verifiedUser));

    return {
      message: "Muvaffaqiyatli kirdingiz",
      session,
    };
  },

  async register(payload: RegisterInput): Promise<RegisterResponse> {
    await delay(MOCK_DELAY);

    const email = normalizeEmail(payload.email);
    const existingUser = users.get(email);

    if (existingUser?.isVerified) {
      throwValidationError("Bu email allaqachon band qilingan", [{ field: "email", message: "Email band" }]);
    }

    const verificationId = createId();
    const code = createOtpCode();
    const expiresAt = Date.now() + 1000 * 60 * 10;

    pendingRegistrations.set(email, {
      fullName: payload.fullName.trim(),
      email,
      password: payload.password,
      verificationId,
      code,
      expiresAt,
    });

    return {
      message: "Ro‘yxatdan o‘tish yakunlandi. OTP kod yuborildi.",
      verificationId,
      expiresAt,
      debugOtp: code,
    };
  },

  async verifyOtp(payload: VerifyOtpInput): Promise<VerifyResponse> {
    await delay(MOCK_DELAY);

    const email = normalizeEmail(payload.email);
    const pending = pendingRegistrations.get(email);

    if (!pending) {
      throwValidationError("Tasdiqlash uchun kutilayotgan so‘rov topilmadi");
    }

    const pendingRegistration = pending!;

    if (pendingRegistration.verificationId !== payload.verificationId && payload.verificationId) {
      throwValidationError("Verification ID mos kelmadi");
    }

    if (Date.now() > pendingRegistration.expiresAt) {
      pendingRegistrations.delete(email);
      throw new AppError({ code: "timeout_error", message: "Kodning muddati tugagan" });
    }

    if (pendingRegistration.code !== payload.code) {
      throwValidationError("Kod noto‘g‘ri", [{ field: "code", message: "OTP kod noto‘g‘ri" }]);
    }

    const storedUser: StoredUser = {
      id: createId(),
      fullName: pendingRegistration.fullName,
      email: pendingRegistration.email,
      avatarUrl: buildAvatarUrl(pendingRegistration.fullName, pendingRegistration.email),
      authMethod: "email",
      isVerified: true,
      password: pendingRegistration.password,
    };

    users.set(email, storedUser);
    pendingRegistrations.delete(email);

    return {
      message: "OTP tasdiqlandi",
      user: toPublicUser(storedUser),
    };
  },

  async logout(): Promise<void> {
    await delay(250);
  },

  async refreshSession(session: AuthSessionSnapshot): Promise<AuthSessionSnapshot> {
    await delay(300);

    return {
      ...session,
      accessToken: crypto.randomUUID(),
      refreshToken: crypto.randomUUID(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };
  },
};
