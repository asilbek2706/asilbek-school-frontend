import { afterEach, describe, expect, it, vi } from "vitest";

import { loader } from "./GitHubAuthStart";

describe("GitHubAuthStart loader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("redirects back to register when GitHub is not configured", async () => {
    vi.stubEnv("GITHUB_CLIENT_ID", "");

    await expect(
      loader({ request: new Request("https://example.com/auth/github") } as never)
    ).rejects.toMatchObject({ status: 302 });
  });

  it("builds the GitHub authorization redirect when configured", async () => {
    vi.stubEnv("GITHUB_CLIENT_ID", "client-id");
    vi.stubEnv("GITHUB_REDIRECT_URI", "https://example.com/auth/github/callback");

    try {
      await loader({ request: new Request("https://example.com/auth/github") } as never);
      throw new Error("Expected redirect");
    } catch (error) {
      const response = error as Response;
      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toContain("github.com/login/oauth/authorize");
      expect(response.headers.get("Set-Cookie")).toContain("github_oauth_state=");
    }
  });
});
