import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act, render, screen } from "@testing-library/react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { PermissionRoute, ProtectedRoute, PublicRoute, RoleRoute } from "./route-guards";

describe("route guards", () => {
  afterEach(() => {
    useAuthStore.setState({
      initialized: true,
      status: "anonymous",
      loading: false,
      error: null,
      cache: {},
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
      loading: false,
      error: null,
      cache: {},
      user: {
        id: "1",
        fullName: "Test User",
        email: "test@example.com",
        avatarUrl: "https://example.com/avatar.png",
        authMethod: "email",
        isVerified: true,
        role: "admin",
        permissions: ["manage_students"],
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
      loading: false,
      error: null,
      cache: {},
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

  it("renders role-guarded content for matching role", () => {
    useAuthStore.setState({
      initialized: true,
      status: "authenticated",
      loading: false,
      error: null,
      cache: {},
      user: {
        id: "1",
        fullName: "Admin",
        email: "admin@example.com",
        avatarUrl: "https://example.com/avatar.png",
        authMethod: "email",
        isVerified: true,
        role: "admin",
        permissions: ["manage_students"],
      },
      accessToken: "token",
      refreshToken: "refresh",
      pendingVerification: null,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <div>Admin Panel</div>
              </RoleRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
  });

  it("renders permission-guarded content for granted permission", () => {
    useAuthStore.setState({
      initialized: true,
      status: "authenticated",
      loading: false,
      error: null,
      cache: {},
      user: {
        id: "1",
        fullName: "Teacher",
        email: "teacher@example.com",
        avatarUrl: "https://example.com/avatar.png",
        authMethod: "email",
        isVerified: true,
        role: "teacher",
        permissions: ["manage_courses"],
      },
      accessToken: "token",
      refreshToken: "refresh",
      pendingVerification: null,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <PermissionRoute requiredPermission="manage_courses">
                <div>Courses Manage</div>
              </PermissionRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Courses Manage")).toBeInTheDocument();
  });
});
