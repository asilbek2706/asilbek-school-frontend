import { beforeEach, describe, expect, it } from "vitest";

import { AppError } from "@/shared/errors";

import { authMockApi } from "./auth.mock";

describe("authMockApi", () => {
  beforeEach(() => {
    // The mock keeps in-memory state; tests use unique emails where needed.
  });

  it("logs in the seeded demo user", async () => {
    const result = await authMockApi.login({
      email: "demo@asilbek.uz",
      password: "Demo12345",
    });

    expect(result.session.user.email).toBe("demo@asilbek.uz");
    expect(result.session.accessToken).toBeTruthy();
  });

  it("throws a validation error for an unknown email", async () => {
    await expect(
      authMockApi.login({
        email: "missing@example.com",
        password: "Password123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("registers a new user and returns an OTP context", async () => {
    const result = await authMockApi.register({
      fullName: "Test User",
      email: "test-user-1@example.com",
      password: "Password123",
      confirmPassword: "Password123",
    });

    expect(result.verificationId).toBeTruthy();
    expect(result.debugOtp).toBe("123456");
  });

  it("verifies OTP and creates a user session record", async () => {
    const email = "test-user-2@example.com";

    const registration = await authMockApi.register({
      fullName: "OTP User",
      email,
      password: "Password123",
      confirmPassword: "Password123",
    });

    const result = await authMockApi.verifyOtp({
      email,
      code: "123456",
      verificationId: registration.verificationId,
      purpose: "register",
    });

    expect(result.user.email).toBe(email);
    expect(result.user.isVerified).toBe(true);
  });

  it("logs out without error", async () => {
    await expect(authMockApi.logout()).resolves.toBeUndefined();
  });

  it("refreshes a session with new tokens", async () => {
    const session = {
      user: {
        id: "1",
        fullName: "Refresh User",
        email: "refresh@example.com",
        avatarUrl: "https://example.com/avatar.png",
        authMethod: "email" as const,
        isVerified: true,
      },
      accessToken: "old-token",
      refreshToken: "old-refresh",
      expiresAt: Date.now() + 1000,
    };

    const refreshed = await authMockApi.refreshSession(session);

    expect(refreshed.accessToken).not.toBe(session.accessToken);
    expect(refreshed.refreshToken).not.toBe(session.refreshToken);
  });
});
