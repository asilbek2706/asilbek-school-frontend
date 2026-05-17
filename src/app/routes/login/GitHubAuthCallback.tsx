import { useEffect } from "react";
import { useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router";
import { toast } from "sonner";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { applyClientAuthSession, clearClientAuthSession } from "@/features/auth/utils/auth-session";
import { githubService } from "@/features/github-auth/services/github.service";
import type { GitHubCallbackResult } from "@/features/github-auth/types/github.types";

export async function loader({ request }: LoaderFunctionArgs): Promise<GitHubCallbackResult> {
  const requestUrl = new URL(request.url);
  const oauthError = requestUrl.searchParams.get("error");

  if (oauthError === "access_denied") {
    return {
      ok: false,
      error: "GitHub authorization foydalanuvchi tomonidan bekor qilindi",
    };
  }

  if (oauthError) {
    return {
      ok: false,
      error: "GitHub authorization xatolik bilan yakunlandi",
    };
  }

  try {
    return await githubService.callback(requestUrl.search);
  } catch {
    return {
      ok: false,
      error: "GitHub xizmati hozircha mavjud emas yoki tarmoq uzildi",
    };
  }
}

export default function GitHubAuthCallback() {
  const navigate = useNavigate();
  const data = useLoaderData<GitHubCallbackResult>();
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    if (!data.ok || !data.session) {
      toast.error(data.error || "GitHub authorization xato");
      navigate("/auth/register", { replace: true });
      return;
    }

    const session = data.session;
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
