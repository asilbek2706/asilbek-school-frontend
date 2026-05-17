import type { AuthSessionSnapshot } from "@/features/auth/types/auth.types";

export type GitHubCallbackResult = {
  ok: boolean;
  error?: string;
  session?: AuthSessionSnapshot;
};
