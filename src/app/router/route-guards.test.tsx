import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { ProtectedRoute, PublicRoute } from "./route-guards";

describe("route guards", () => {
  afterEach(() => {
    useAuthStore.setState({
      initialized: true,
      status: "anonymous",
      user: null,
      accessToken: null,
      refreshToken: null,
      pendingVerification: null,
    });
  });

  it("renders protected content for authenticated users", () => {
    useAuthStore.setState({
      initialized: true,
      status: "authenticated",
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
      pendingVerification: null,
    });

    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><div>Dashboard</div></ProtectedRoute>} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders public content for anonymous users", () => {
    useAuthStore.setState({
      initialized: true,
      status: "anonymous",
      user: null,
      accessToken: null,
      refreshToken: null,
      pendingVerification: null,
    });

    act(() => {
      render(
        <MemoryRouter initialEntries={["/auth/login"]}>
          <Routes>
            <Route path="/auth/login" element={<PublicRoute><div>Login</div></PublicRoute>} />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
