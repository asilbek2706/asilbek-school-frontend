import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AuthSessionSnapshot } from "@/features/auth/types/auth.types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  readClientAuthSession,
} from "@/features/auth/utils/auth-session";

type AppProvidersProps = {
  children: ReactNode;
  initialAuth: AuthSessionSnapshot | null;
};

const AuthBootstrapContext = createContext<AuthSessionSnapshot | null>(null);

export const useAuthBootstrap = () => useContext(AuthBootstrapContext);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const AppProviders = ({ children, initialAuth }: AppProvidersProps) => {
  const hydrate = useAuthStore((state) => state.hydrate);

  const resolvedAuth = useMemo(
    () => initialAuth ?? readClientAuthSession(),
    [initialAuth]
  );

  useEffect(() => {
    hydrate(resolvedAuth);
  }, [hydrate, resolvedAuth]);

  return (
    <AuthBootstrapContext.Provider value={resolvedAuth}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthBootstrapContext.Provider>
  );
};
