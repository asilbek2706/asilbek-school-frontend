import axios from "axios";

import { normalizeError } from "@/shared/errors";
import { useAuthStore } from "@/features/auth/store/auth.store";

const baseURL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const httpClient = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = normalizeError(error);

    if (normalizedError.code === "unauthorized_error") {
      useAuthStore.getState().clearSession();
    }

    return Promise.reject(normalizedError);
  }
);
