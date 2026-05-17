import { useMutation } from "@tanstack/react-query";

import { authService } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/auth.store";
import type {
  LoginInput,
  RegisterInput,
  VerifyOtpInput,
} from "@/features/auth/types/auth.types";
import {
  applyClientAuthSession,
  clearClientAuthSession,
} from "@/features/auth/utils/auth-session";
import { normalizeError } from "@/shared/errors";

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);

  return useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
    onSuccess: (data) => {
      setSession(data.session);
      applyClientAuthSession(data.session);
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      normalizeError(error);
      setLoading(false);
    },
  });
};

export const useRegisterMutation = () => {
  const setPendingVerification = useAuthStore(
    (state) => state.setPendingVerification
  );
  const setLoading = useAuthStore((state) => state.setLoading);

  return useMutation({
    mutationFn: (payload: RegisterInput) => authService.register(payload),
    onSuccess: (data, variables) => {
      setPendingVerification({
        fullName: variables.fullName.trim(),
        email: variables.email.trim().toLowerCase(),
        verificationId: data.verificationId,
        expiresAt: data.expiresAt,
        debugOtp: data.debugOtp,
      });
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      normalizeError(error);
      setLoading(false);
    },
  });
};

export const useVerifyOtpMutation = () => {
  const clearPendingVerification = useAuthStore(
    (state) => state.setPendingVerification
  );
  const setLoading = useAuthStore((state) => state.setLoading);

  return useMutation({
    mutationFn: (payload: VerifyOtpInput) => authService.verifyOtp(payload),
    onSuccess: () => {
      clearPendingVerification(null);
      setLoading(false);
    },
    onMutate: () => {
      setLoading(true);
    },
    onError: (error) => {
      normalizeError(error);
      setLoading(false);
    },
  });
};

export const useAuth = () =>
  useAuthStore((state) => ({
    initialized: state.initialized,
    status: state.status,
    user: state.user,
    accessToken: state.accessToken,
    pendingVerification: state.pendingVerification,
  }));

export const useLogoutMutation = () => {
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      clearSession();
      clearClientAuthSession();
    },
  });
};
