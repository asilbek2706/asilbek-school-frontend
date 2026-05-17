import { afterEach, describe, expect, it, vi } from "vitest";

import { loader } from "./GitHubAuthStart";

describe("GitHubAuthStart loader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("redirects to local mock callback in mock mode", async () => {
    vi.stubEnv("VITE_USE_MOCK", "true");

    try {
      await loader({ request: new Request("https://example.com/auth/github") } as never);
      throw new Error("Expected redirect");
    } catch (error) {
      const response = error as Response;
      expect(response.status).toBe(302);
      expect(response.headers.get("Location")).toContain("/auth/github/callback?mock=1");
    }
  });
});
