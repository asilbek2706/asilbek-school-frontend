import { afterEach, describe, expect, it, vi } from "vitest";

import { loader } from "./GitHubAuthCallback";

describe("GitHubAuthCallback loader", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns an error when GitHub env vars are missing", async () => {
    await expect(
      loader({ request: new Request("https://example.com/auth/github/callback") } as never)
    ).resolves.toMatchObject({ ok: false });
  });

  it("exchanges code and loads the GitHub profile", async () => {
    vi.stubEnv("GITHUB_CLIENT_ID", "client-id");
    vi.stubEnv("GITHUB_CLIENT_SECRET", "client-secret");
    vi.stubEnv("GITHUB_REDIRECT_URI", "https://example.com/auth/github/callback");

    const fetchMock = vi.spyOn(globalThis, "fetch");
    fetchMock
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ access_token: "token-123" }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({
          login: "asilbek",
          name: "Asilbek Demo",
          avatar_url: "https://example.com/avatar.png",
          html_url: "https://github.com/asilbek",
          email: "demo@example.com",
        }), { status: 200 })
      );

    const request = new Request(
      "https://example.com/auth/github/callback?code=code-123&state=state-123",
      {
        headers: {
          Cookie: "github_oauth_state=state-123",
        },
      }
    );

    const result = await loader({ request } as never);

    expect(result.ok).toBe(true);
    expect(result.profile?.login).toBe("asilbek");
  });
});
