import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { DEFAULT_AUTH_REDIRECT } from "@/features/auth/utils/auth.constants";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useAuthBootstrap } from "@/app/providers/AppProviders";
import { hasPermission } from "@/app/config/rbac";
import type { UserPermission, UserRole } from "@/features/auth/types/auth.types";

const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center text-white/70">
    Yuklanmoqda...
  </div>
);

type GuardProps = {
  children: ReactNode;
};

type RoleGuardProps = GuardProps & {
  allowedRoles: UserRole[];
  fallbackPath?: string;
};

type PermissionGuardProps = GuardProps & {
  requiredPermission: UserPermission;
  fallbackPath?: string;
};

export const ProtectedRoute = ({ children }: GuardProps) => {
  const bootstrapAuth = useAuthBootstrap();
  const initialized = useAuthStore((state) => state.initialized);
  const status = useAuthStore((state) => state.status);
  const isAuthenticated = useAuthStore((state) => state.status === "authenticated");

  if (!initialized && !bootstrapAuth) {
    return <LoadingState />;
  }

  if (!bootstrapAuth && !isAuthenticated && status !== "authenticated") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }: GuardProps) => {
  const bootstrapAuth = useAuthBootstrap();
  const status = useAuthStore((state) => state.status);
  const initialized = useAuthStore((state) => state.initialized);

  if (!initialized && !bootstrapAuth) {
    return <LoadingState />;
  }

  if (bootstrapAuth || status === "authenticated") {
    return <Navigate to={DEFAULT_AUTH_REDIRECT} replace />;
  }

  return children;
};

export const RoleRoute = ({
  children,
  allowedRoles,
  fallbackPath = "/",
}: RoleGuardProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export const PermissionRoute = ({
  children,
  requiredPermission,
  fallbackPath = "/",
}: PermissionGuardProps) => {
  const user = useAuthStore((state) => state.user);

  if (!user || !hasPermission(user.role, requiredPermission, user.permissions)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export const RoleGuard = RoleRoute;
export const PermissionGuard = PermissionRoute;
