import type { AuthSessionSnapshot } from "@/features/auth/types/auth.types";
import {
  applyClientAuthSession,
  clearClientAuthSession,
  readClientAuthSession,
} from "@/features/auth/utils/auth-session";

export type SessionAdapter = {
  read: () => AuthSessionSnapshot | null;
  write: (session: AuthSessionSnapshot) => void;
  clear: () => void;
};

export const cookieSessionAdapter: SessionAdapter = {
  read: () => readClientAuthSession(),
  write: (session) => applyClientAuthSession(session),
  clear: () => clearClientAuthSession(),
};
