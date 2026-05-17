import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AuthAlert, AuthPasswordField, AuthSectionLink, AuthTextField, AuthTitle } from "../components";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { Button } from "@/shared/ui";
import { RegisterSchema, type RegisterFormValues } from "../schemas/auth.schemas";
import { useRegisterMutation } from "../hooks/useAuth";
import { applyAuthError } from "../utils/auth-error";

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (registerMutation.data?.message) {
      setServerMessage(registerMutation.data.message);
    }
  }, [registerMutation.data?.message]);

  const handleSubmit = form.handleSubmit(async (values) => {
    setServerMessage(null);

    try {
      const response = await registerMutation.mutateAsync(values);
      toast.success(response.message);

      navigate("/auth/verify", {
        replace: true,
        state: {
          purpose: "register",
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          verificationId: response.verificationId,
          expiresAt: response.expiresAt,
          debugOtp: response.debugOtp,
          message: response.message,
        },
      });
    } catch (error) {
      const message = applyAuthError(error, form.setError) || "Ro‘yxatdan o‘tish amalga oshmadi";
      setServerMessage(message);
      toast.error(message);
    }
  });

  return (
    <AuthLayout
      title="Ro‘yxatdan o‘tish"
      description="Hisob yarating, OTP kodni tasdiqlang va keyin login qiling."
      footer={
        <div className="space-y-3">
          <AuthSectionLink onClick={() => navigate("/auth/login")}>Menda akkaunt bor</AuthSectionLink>
          <AuthSectionLink onClick={() => navigate("/auth/github")}>GitHub bilan ro‘yxatdan o‘tish</AuthSectionLink>
        </div>
      }
      aside={
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/65">
          <p className="font-semibold text-white">Nima saqlanadi?</p>
          <p className="mt-2">Faqat service va store qatlamlari auth holatini boshqaradi. UI faqat form va layout bilan ishlaydi.</p>
        </div>
      }
    >
      <AuthTitle
        title="Yangi hisob"
        description="To‘liq ism, email va parol kiriting. Ro‘yxatdan o‘tishdan keyin OTP kod bilan emailni tasdiqlaysiz."
      />

      {serverMessage && (
        <div className="mb-5">
          <AuthAlert tone="info">{serverMessage}</AuthAlert>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthTextField
          label="To‘liq ism"
          placeholder="Ism familiya"
          autoComplete="name"
          error={form.formState.errors.fullName?.message}
          {...form.register("fullName")}
        />

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
          placeholder="Kamida 8 ta belgi"
          autoComplete="new-password"
          error={form.formState.errors.password?.message}
          value={form.watch("password")}
          onChange={(event) => form.setValue("password", event.target.value, { shouldValidate: true })}
        />

        <AuthPasswordField
          label="Parolni tasdiqlang"
          placeholder="Parolni qayta kiriting"
          autoComplete="new-password"
          error={form.formState.errors.confirmPassword?.message}
          value={form.watch("confirmPassword")}
          onChange={(event) => form.setValue("confirmPassword", event.target.value, { shouldValidate: true })}
        />

        <Button type="submit" loading={form.formState.isSubmitting || registerMutation.isPending}>
          Ro‘yxatdan o‘tish
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
