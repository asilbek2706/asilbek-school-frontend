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
  user: AuthUser | null;
  accessToken: string | null;
  pendingVerification: PendingVerificationContext | null;
  hydrate: (session: AuthSessionSnapshot | null) => void;
  setSession: (session: AuthSessionSnapshot) => void;
  clearSession: () => void;
  setPendingVerification: (context: PendingVerificationContext | null) => void;
  markLoading: () => void;
};

const initialState = {
  initialized: false,
  status: "idle" as AuthStatus,
  user: null,
  accessToken: null,
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
    }),
  setSession: (session) =>
    set({
      initialized: true,
      status: "authenticated",
      user: session.user,
      accessToken: session.accessToken,
    }),
  clearSession: () =>
    set({
      initialized: true,
      status: "anonymous",
      user: null,
      accessToken: null,
      pendingVerification: null,
    }),
  setPendingVerification: (context) =>
    set({
      status: context ? "verifying" : "anonymous",
      pendingVerification: context,
    }),
  markLoading: () => set({ status: "loading" }),
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
    pendingVerification: state.pendingVerification,
  };
};
