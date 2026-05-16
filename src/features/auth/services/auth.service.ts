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

import { buildAvatarUrl, delay } from "../utils/auth-session";

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

export const authService = {
  async login(payload: LoginInput): Promise<LoginResponse> {
    await delay(MOCK_DELAY);

    const email = normalizeEmail(payload.email);
    const storedUser = users.get(email);

    if (!storedUser) {
      throw new Error("Bunday email topilmadi");
    }

    if (!storedUser.isVerified) {
      throw new Error("Akkaunt hali tasdiqlanmagan");
    }

    if (storedUser.password !== payload.password) {
      throw new Error("Email yoki parol noto‘g‘ri");
    }

    const session = createSession(toPublicUser(storedUser));

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
      throw new Error("Bu email allaqachon band qilingan");
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
      throw new Error("Tasdiqlash uchun kutilayotgan so‘rov topilmadi");
    }

    if (pending.verificationId !== payload.verificationId && payload.verificationId) {
      throw new Error("Verification ID mos kelmadi");
    }

    if (Date.now() > pending.expiresAt) {
      pendingRegistrations.delete(email);
      throw new Error("Kodning muddati tugagan");
    }

    if (pending.code !== payload.code) {
      throw new Error("Kod noto‘g‘ri");
    }

    const storedUser: StoredUser = {
      id: createId(),
      fullName: pending.fullName,
      email: pending.email,
      avatarUrl: buildAvatarUrl(pending.fullName, pending.email),
      authMethod: "email",
      isVerified: true,
      password: pending.password,
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
};
