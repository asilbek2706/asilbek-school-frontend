import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import type { AuthSessionSnapshot } from "@/features/auth/types/auth.types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { cookieSessionAdapter } from "@/features/auth/api/session.adapter";
import { createAppQueryClient } from "@/shared/api";

type AppProvidersProps = {
  children: ReactNode;
  initialAuth: AuthSessionSnapshot | null;
};

const AuthBootstrapContext = createContext<AuthSessionSnapshot | null>(null);

export const useAuthBootstrap = () => useContext(AuthBootstrapContext);

const queryClient = createAppQueryClient();

export const AppProviders = ({ children, initialAuth }: AppProvidersProps) => {
  const hydrate = useAuthStore((state) => state.hydrate);

  const resolvedAuth = initialAuth ?? cookieSessionAdapter.read();

  useEffect(() => {
    hydrate(resolvedAuth);
  }, [hydrate, resolvedAuth]);

  return (
    <AuthBootstrapContext.Provider value={resolvedAuth}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthBootstrapContext.Provider>
  );
};
