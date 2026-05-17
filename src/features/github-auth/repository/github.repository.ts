import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { buildAvatarUrl } from "@/features/auth/utils/auth-session";
import type { AuthSessionSnapshot } from "@/features/auth/types/auth.types";
import type { GitHubCallbackResult } from "@/features/github-auth/types/github.types";

const createMockSession = (): AuthSessionSnapshot => ({
  user: {
    id: "github-mock-user",
    fullName: "GitHub Mock User",
    email: "github-mock@example.com",
    avatarUrl: buildAvatarUrl("GitHub Mock User", "github-mock@example.com"),
    authMethod: "github",
    isVerified: true,
    role: "student",
    permissions: ["view_dashboard"],
  },
  accessToken: crypto.randomUUID(),
  refreshToken: crypto.randomUUID(),
  expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
});

export const githubRepository = {
  getStartUrl(origin: string): string {
    if (env.USE_MOCK) {
      return `${origin}/auth/github/callback?mock=1`;
    }

    const callback = encodeURIComponent(`${origin}/auth/github/callback`);
    return `${env.API_BASE_URL}/auth/github/start?redirect_uri=${callback}`;
  },

  async callback(searchParams: string): Promise<GitHubCallbackResult> {
    if (env.USE_MOCK) {
      return { ok: true, session: createMockSession() };
    }

    return unwrapResponse(
      httpClient.get<GitHubCallbackResult>(`/auth/github/callback${searchParams}`)
    );
  },
};
