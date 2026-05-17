import { create } from "zustand";

import type {
  AuthSessionSnapshot,
  AuthStatus,
  AuthUser,
  PendingVerificationContext,
} from "@/features/auth/types/auth.types";

type AuthStoreState = {
  initialized: boolean;
  status: AuthStatus;
  loading: boolean;
  error: string | null;
  cache: Record<string, unknown>;
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  pendingVerification: PendingVerificationContext | null;
  hydrate: (session: AuthSessionSnapshot | null) => void;
  setSession: (session: AuthSessionSnapshot) => void;
  clearSession: () => void;
  setPendingVerification: (context: PendingVerificationContext | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCacheEntry: (key: string, value: unknown) => void;
  login: () => Promise<void>;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
};

const initialState = {
  initialized: false,
  status: "idle" as AuthStatus,
  loading: false,
  error: null,
  cache: {},
  user: null,
  accessToken: null,
  refreshToken: null,
  pendingVerification: null,
};

export const useAuthStore = create<AuthStoreState>((set) => ({
  ...initialState,
  hydrate: (session) =>
    set({
      initialized: true,
      status: session ? "authenticated" : "anonymous",
      user: session?.user ?? null,
      accessToken: session?.accessToken ?? null,
      refreshToken: session?.refreshToken ?? null,
    }),
  setSession: (session) =>
    set({
      initialized: true,
      status: "authenticated",
      user: session.user,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken ?? null,
    }),
  clearSession: () =>
    set({
      initialized: true,
      status: "anonymous",
      user: null,
      accessToken: null,
      refreshToken: null,
      pendingVerification: null,
    }),
  setPendingVerification: (context) =>
    set({
      status: context ? "verifying" : "anonymous",
      pendingVerification: context,
    }),
  setLoading: (loading) =>
    set((state) => ({
      loading,
      status: loading
        ? "loading"
        : state.user
          ? "authenticated"
          : state.pendingVerification
            ? "verifying"
            : "anonymous",
    })),
  setError: (error) => set({ error }),
  setCacheEntry: (key, value) =>
    set((state) => ({
      cache: {
        ...state.cache,
        [key]: value,
      },
    })),
  login: async () => undefined,
  logout: () => undefined,
  setUser: (user) => set({ user }),
}));

export const selectIsAuthenticated = (state: AuthStoreState) =>
  state.status === "authenticated" && Boolean(state.user);

export const getAuthSnapshot = () => {
  const state = useAuthStore.getState();

  return {
    initialized: state.initialized,
    status: state.status,
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
    pendingVerification: state.pendingVerification,
  };
};
