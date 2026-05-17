import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { createAppQueryClient } from "@/shared/api";

const mocks = vi.hoisted(() => ({
  setSessionMock: vi.fn(),
  setLoadingMock: vi.fn(),
  loginMock: vi.fn(async () => ({
    message: "Muvaffaqiyatli kirdingiz",
    session: {
      user: {
        id: "1",
        fullName: "Test User",
        email: "test@example.com",
        avatarUrl: "https://example.com/avatar.png",
        authMethod: "email",
        isVerified: true,
      },
      accessToken: "token",
      refreshToken: "refresh",
      expiresAt: Date.now() + 1000,
    },
  })),
}));

vi.mock("@/features/auth/store/auth.store", () => ({
  useAuthStore: (selector: (state: unknown) => unknown) =>
    selector({
      initialized: true,
      status: "anonymous",
      user: null,
      accessToken: null,
      refreshToken: null,
      pendingVerification: null,
      setSession: mocks.setSessionMock,
      setLoading: mocks.setLoadingMock,
      clearSession: vi.fn(),
      setPendingVerification: vi.fn(),
      hydrate: vi.fn(),
      login: vi.fn(),
      logout: vi.fn(),
      setUser: vi.fn(),
    }),
}));

vi.mock("@/features/auth/services/auth.service", () => ({
  authService: {
    login: mocks.loginMock,
    register: vi.fn(),
    verifyOtp: vi.fn(),
    logout: vi.fn(),
    refreshSession: vi.fn(),
  },
}));

import { useLoginMutation } from "./useAuth";

describe("useLoginMutation", () => {
  const queryClient = createAppQueryClient();

  afterEach(() => {
    mocks.setSessionMock.mockClear();
    mocks.setLoadingMock.mockClear();
    mocks.loginMock.mockClear();
  });

  it("calls the login service and stores the session on success", async () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useLoginMutation(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({ email: "test@example.com", password: "Password1" });
    });

    expect(mocks.loginMock).toHaveBeenCalledWith({ email: "test@example.com", password: "Password1" });
    expect(mocks.setSessionMock).toHaveBeenCalledWith(expect.objectContaining({ accessToken: "token" }));
    expect(mocks.setLoadingMock).toHaveBeenCalledWith(false);
  });
});
