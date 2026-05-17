import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AuthAlert, AuthSectionLink, AuthTextField, AuthTitle, OtpInput } from "../components";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { Button } from "@/shared/ui";
import { VerifySchema, type VerifyFormValues } from "../schemas/auth.schemas";
import { useVerifyOtpMutation } from "../hooks/useAuth";
import { useAuthStore } from "../store/auth.store";
import { applyAuthError } from "../utils/auth-error";

type VerifyLocationState = {
  purpose?: "register" | "login";
  email?: string;
  fullName?: string;
  verificationId?: string;
  expiresAt?: number;
  debugOtp?: string;
  message?: string;
};

const formatSeconds = (value: number) =>
  `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verifyMutation = useVerifyOtpMutation();
  const pendingVerification = useAuthStore((state) => state.pendingVerification);
  const [resendTimer, setResendTimer] = useState(45);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const state = (location.state as VerifyLocationState | null) ?? null;

  const initialEmail = state?.email ?? pendingVerification?.email ?? "";
  const initialPurpose = state?.purpose ?? "register";
  const initialVerificationId = state?.verificationId ?? pendingVerification?.verificationId;
  const shouldReturnToLogin = initialPurpose === "register";

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(VerifySchema),
    defaultValues: {
      email: initialEmail,
      code: "",
      verificationId: initialVerificationId,
      purpose: initialPurpose,
    },
    mode: "onTouched",
  });

  const debugOtp = useMemo(
    () => state?.debugOtp ?? pendingVerification?.debugOtp,
    [pendingVerification?.debugOtp, state?.debugOtp]
  );

  useEffect(() => {
    if (state?.message) {
      setInfoMessage(state.message);
    }
  }, [state?.message]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setResendTimer((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const resendOtp = () => {
    if (resendTimer > 0) {
      return;
    }

    setResendTimer(45);
    toast.success("OTP kod qayta yuborildi");

    if (debugOtp) {
      setInfoMessage(`Mock OTP: ${debugOtp}`);
    }
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    setInfoMessage(null);

    try {
      const response = await verifyMutation.mutateAsync({
        ...values,
        email: values.email.trim(),
      });

      toast.success(response.message);

      if (shouldReturnToLogin) {
        navigate("/auth/login", {
          replace: true,
          state: {
            email: values.email.trim(),
            message: "Email tasdiqlandi. Endi login qiling.",
          },
        });
        return;
      }

      navigate("/", { replace: true });
    } catch (error) {
      const message = applyAuthError(error, form.setError) || "OTP tasdiqlanmadi";
      setInfoMessage(message);
      toast.error(message);
    }
  });

  return (
    <AuthLayout
      title="OTP tasdiqlash"
      description="Ro‘yxatdan o‘tish paytida yuborilgan 6 xonali kodni kiriting."
      footer={
        <div className="space-y-3">
          <AuthSectionLink onClick={() => navigate("/auth/login")}>Login sahifasiga qaytish</AuthSectionLink>
          <button
            type="button"
            onClick={resendOtp}
            disabled={resendTimer > 0}
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white/70 transition-all hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {resendTimer > 0 ? `Qayta yuborish ${formatSeconds(resendTimer)}` : "Kodni qayta yuborish"}
          </button>
        </div>
      }
      aside={
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-white/65">
          <p className="font-semibold text-white">OTP oqimi</p>
          <p className="mt-2">6 ta alohida input, avtomatik fokus, paste va backspace support mavjud. Barcha autentifikatsiya logikasi hook va service qatlamida.</p>
          {debugOtp && (
            <div className="mt-4 rounded-2xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm text-orange-100">
              Mock kod: {debugOtp}
            </div>
          )}
        </div>
      }
    >
      <AuthTitle
        title="Kodni tasdiqlash"
        description="Emailingizga yuborilgan kodni kiriting. Test muhitida kod service layer orqali generatsiya qilinadi."
      />

      {infoMessage && (
        <div className="mb-5">
          <AuthAlert tone="info">{infoMessage}</AuthAlert>
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

        <div className="space-y-2">
          <span className="text-sm font-medium text-white/80">OTP kod</span>
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <OtpInput value={field.value} onChange={field.onChange} disabled={verifyMutation.isPending} />
            )}
          />
          {form.formState.errors.code?.message && (
            <p className="text-sm text-red-400">{form.formState.errors.code.message}</p>
          )}
        </div>

        <Button type="submit" loading={form.formState.isSubmitting || verifyMutation.isPending}>
          Tasdiqlash
        </Button>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtpPage;
