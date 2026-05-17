import { useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
} from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  applyClientAuthSession,
  clearClientAuthSession,
  clearClientCookie,
} from "@/features/auth/utils/auth-session";
import { buildAvatarUrl } from "@/features/auth/utils/auth-session";

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  email: string | null;
};

type LoaderData = {
  ok: boolean;
  error?: string;
  profile?: GitHubUser;
};

const OAUTH_STATE_COOKIE = "github_oauth_state";

const getCookieValue = (cookieHeader: string | null, key: string) => {
  if (!cookieHeader) {
    return "";
  }

  return cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${key}=`))
    ?.split("=")[1] ?? "";
};

export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      ok: false,
      error: "GitHub OAuth sozlamalari topilmadi",
    };
  }

  const requestUrl = new URL(request.url);
  const redirectUri =
    process.env.GITHUB_REDIRECT_URI ||
    `${requestUrl.origin}/auth/github/callback`;

  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const oauthError = requestUrl.searchParams.get("error");

  if (oauthError) {
    return {
      ok: false,
      error: "GitHub authorization bekor qilindi",
    };
  }

  if (!code || !state) {
    return {
      ok: false,
      error: "GitHub callback ma'lumotlari noto‘g‘ri",
    };
  }

  const savedState = getCookieValue(
    request.headers.get("Cookie"),
    OAUTH_STATE_COOKIE
  );

  if (!savedState || savedState !== state) {
    return {
      ok: false,
      error: "OAuth state tekshiruvi muvaffaqiyatsiz",
    };
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      state,
    }),
  });

  if (!tokenResponse.ok) {
    return {
      ok: false,
      error: "GitHub token olishda xatolik",
    };
  }

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string;
  };

  if (!tokenData.access_token) {
    return {
      ok: false,
      error: "GitHub access token topilmadi",
    };
  }

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (!userResponse.ok) {
    return {
      ok: false,
      error: "GitHub profilini olishda xatolik",
    };
  }

  const profile = (await userResponse.json()) as GitHubUser;

  return {
    ok: true,
    profile,
  };
}

export default function GitHubAuthCallback() {
  const navigate = useNavigate();
  const data = useLoaderData<LoaderData>();
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    if (!data.ok || !data.profile) {
      toast.error(data.error || "GitHub authorization xato");
      navigate("/auth/register", { replace: true });
      return;
    }

    const resolvedName = data.profile.name?.trim() || data.profile.login;
    const session = {
      user: {
        id: data.profile.login,
        fullName: resolvedName,
        email: data.profile.email || "",
        avatarUrl: data.profile.avatar_url || buildAvatarUrl(resolvedName, data.profile.email || data.profile.login),
        authMethod: "github" as const,
        isVerified: true,
      },
      accessToken: crypto.randomUUID(),
      refreshToken: crypto.randomUUID(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    };

    clearClientCookie("github_oauth_state");
    clearClientAuthSession();
    setSession(session);
    applyClientAuthSession(session);

    toast.success("GitHub orqali muvaffaqiyatli kirdingiz");
    navigate("/", { replace: true });
  }, [data, navigate, setSession]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-white/80">
        GitHub authorization tekshirilmoqda...
      </div>
    </section>
  );
}
