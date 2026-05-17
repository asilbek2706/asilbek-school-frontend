import { afterEach, describe, expect, it, vi } from "vitest";

import { loader } from "./GitHubAuthCallback";

describe("GitHubAuthCallback loader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns mock callback session in mock mode", async () => {
    vi.stubEnv("VITE_USE_MOCK", "true");

    await expect(
      loader({ request: new Request("https://example.com/auth/github/callback") } as never)
    ).resolves.toMatchObject({ ok: true });
  });

  it("returns cancellation error when user rejects consent", async () => {
    const request = new Request(
      "https://example.com/auth/github/callback?error=access_denied"
    );

    const result = await loader({ request } as never);

    expect(result.ok).toBe(false);
    expect(result.error).toContain("bekor");
  });
});
