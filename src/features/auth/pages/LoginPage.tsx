import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AuthAlert, AuthPasswordField, AuthSectionLink, AuthTextField, AuthTitle } from "../components";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { Button } from "@/shared/ui";
import { LoginSchema, type LoginFormValues } from "../schemas/auth.schemas";
import { useLoginMutation } from "../hooks/useAuth";

type LoginLocationState = {
  message?: string;
  email?: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLoginMutation();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const state = (location.state as LoginLocationState | null) ?? null;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: state?.email ?? "",
      password: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (state?.message) {
      setServerMessage(state.message);
    }
  }, [state?.message]);

  const handleSubmit = form.handleSubmit(async (values) => {
    setServerMessage(null);

    try {
      const response = await loginMutation.mutateAsync(values);
      toast.success(response.message);
      navigate("/", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login amalga oshmadi";
      setServerMessage(message);
      toast.error(message);
    }
  });

  return (
    <AuthLayout
      title="Hisobga kirish"
      description="Email va parol orqali tizimga kiring. Hisobingiz tasdiqlangan bo‘lishi kerak."
      footer={
        <div className="space-y-3">
          <AuthSectionLink onClick={() => navigate("/auth/register")}>
            Akkount yo‘qmi? Ro‘yxatdan o‘ting
          </AuthSectionLink>
          <AuthSectionLink onClick={() => navigate("/auth/github")}>
            GitHub bilan davom etish
          </AuthSectionLink>
        </div>
      }
      aside={
        <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
          <div>
            <p className="text-sm text-white/40">Demo account</p>
            <p className="mt-1 text-lg font-semibold text-white">demo@asilbek.uz</p>
            <p className="text-sm text-white/40">Parol: Demo12345</p>
          </div>
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4 text-sm text-orange-100">
            Login muvaffaqiyatli bo‘lsa, auth holati store va cookie orqali saqlanadi.
          </div>
        </div>
      }
    >
      <AuthTitle
        title="Kirish"
        description="Yaroqli hisob bilan tizimga kiring. Agar akkaunt hali yoqilmagan bo‘lsa, avval ro‘yxatdan o‘ting va OTP ni tasdiqlang."
      />

      {serverMessage && (
        <div className="mb-5">
          <AuthAlert tone="info">{serverMessage}</AuthAlert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthTextField
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />

        <AuthPasswordField
          label="Parol"
          placeholder="Parolni kiriting"
          autoComplete="current-password"
          error={form.formState.errors.password?.message}
          value={form.watch("password")}
          onChange={(event) => form.setValue("password", event.target.value, { shouldValidate: true })}
        />

        <Button type="submit" loading={form.formState.isSubmitting || loginMutation.isPending}>
          Kirish
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
