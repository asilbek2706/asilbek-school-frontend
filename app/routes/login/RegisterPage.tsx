import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import AuthShell, {
  AuthField,
  authButtonClass,
  authInputClass,
  authSecondaryButtonClass,
} from "./AuthShell";

type AuthMode = "github" | "email";

const buildEmailAvatar = (fullname?: string, email?: string) => {
  const seed = fullname?.trim() || email?.trim() || "Asilbek School";

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    seed
  )}`;
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [mode, setMode] = useState<AuthMode>("github");

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const oauthError = searchParams.get("oauth_error");

    if (!oauthError) {
      return;
    }

    if (oauthError === "not_configured") {
      toast.error("GitHub OAuth sozlanmagan. Admin GITHUB_CLIENT_ID va GITHUB_CLIENT_SECRET qo‘shishi kerak.");
    } else {
      toast.error("GitHub orqali kirishda xatolik yuz berdi");
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("oauth_error");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const resetFeedback = () => {
    setErrors({
      fullname: "",
      email: "",
      phone: "",
    });
  };

  const handleModeChange = (nextMode: AuthMode) => {
    setMode(nextMode);
    resetFeedback();
  };

  const validateEmail = () => {
    const nextErrors = {
      fullname: "",
      email: "",
      phone: "",
    };

    if (!form.fullname.trim()) {
      nextErrors.fullname = "Ism familiya kiritish majburiy";
    } else if (form.fullname.trim().length < 3) {
      nextErrors.fullname = "Kamida 3 ta belgi kiriting";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email kiritish majburiy";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Email noto‘g‘ri formatda";
    }

    if (form.phone.trim() && !/^\+?\d{9,15}$/.test(form.phone.replace(/\s+/g, ""))) {
      nextErrors.phone = "Telefon raqam noto‘g‘ri formatda";
    }

    setErrors(nextErrors);

    return Object.values(nextErrors).every((error) => !error);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "github") {
      navigate("/login/github");
      return;
    }

    if (!validateEmail()) {
      return;
    }

    navigate("/login", {
      state: {
        message: "Email orqali ro‘yxatdan o‘tish yakunlandi. Endi login qiling.",
        fullname: form.fullname.trim(),
        email: form.email.trim(),
      },
    });
  };

  const emailPreviewAvatar = buildEmailAvatar(form.fullname, form.email);

  return (
    <AuthShell
      title={mode === "github" ? "GitHub orqali ro‘yxatdan o‘tish" : "Email orqali ro‘yxatdan o‘tish"}
      description={
        mode === "github"
          ? "GitHub oynasida authorize qiling, profil ma'lumotlari avtomatik olinadi"
          : "Ism familiya va email kiriting, keyin login va verify bosqichidan o‘tasiz"
      }
      footer={
        <div className="space-y-3">
          <button
            onClick={() => navigate("/login")}
            className={authSecondaryButtonClass}
          >
            Menda akkaunt bor. Login
          </button>

          <p className="text-center text-xs text-white/35">
            GitHub tanlansa darhol asosiy sahifaga o‘tasiz, email tanlansa login va verify bosqichlari ishlaydi.
          </p>
        </div>
      }
    >
      <div className="mb-6 grid grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
        <button
          type="button"
          onClick={() => handleModeChange("github")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            mode === "github"
              ? "bg-orange-500 text-white shadow-[0_12px_30px_rgba(249,115,22,0.22)]"
              : "text-white/60 hover:text-white"
          }`}
        >
          GitHub
        </button>

        <button
          type="button"
          onClick={() => handleModeChange("email")}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            mode === "email"
              ? "bg-orange-500 text-white shadow-[0_12px_30px_rgba(249,115,22,0.22)]"
              : "text-white/60 hover:text-white"
          }`}
        >
          Email
        </button>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        {mode === "github" ? (
          <>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
                  <i className="bi bi-github text-2xl text-white" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">
                    GitHub OAuth (1-click)
                  </h3>
                  <p className="mt-1 text-sm text-white/45">
                    Tugmani bossangiz GitHub oynasi ochiladi. Authorize qilganingizdan keyin avtomatik asosiy sahifaga o‘tasiz.
                  </p>
                </div>
              </div>
            </div>

            <button type="submit" className={authButtonClass}>
              GitHub bilan davom etish (OAuth)
            </button>
          </>
        ) : (
          <>
            <AuthField error={errors.fullname}>
              <input
                type="text"
                placeholder="Ism familiya"
                value={form.fullname}
                onChange={(e) =>
                  setForm({ ...form, fullname: e.target.value })
                }
                className={authInputClass}
              />
            </AuthField>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center gap-4">
                <img
                  src={emailPreviewAvatar}
                  alt={form.fullname || "Email user"}
                  className="h-16 w-16 rounded-full border-2 border-orange-500/30 object-cover"
                />

                <div className="min-w-0">
                  <p className="text-sm text-white/45">Email profil preview</p>
                  <h3 className="truncate text-lg font-bold text-white">
                    {form.fullname.trim() || "Ism familiya"}
                  </h3>
                  <p className="truncate text-sm text-orange-300">
                    {form.email.trim() || "email@example.com"}
                  </p>
                </div>
              </div>
            </div>

            <AuthField error={errors.email}>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className={authInputClass}
              />
            </AuthField>

            <AuthField error={errors.phone}>
              <input
                type="text"
                placeholder="Telefon raqam (ixtiyoriy)"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className={authInputClass}
              />
            </AuthField>

            <button type="submit" className={authButtonClass}>
              Email bilan ro‘yxatdan o‘tish
            </button>
          </>
        )}
      </form>
    </AuthShell>
  );
};

export default RegisterPage;