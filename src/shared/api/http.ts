import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";

import { normalizeError } from "@/shared/errors";
import { env } from "@/shared/config/env";
import { useAuthStore } from "@/features/auth/store/auth.store";

type RetryableConfig = AxiosRequestConfig & {
  __retryCount?: number;
  skipAuthRefresh?: boolean;
};

const MAX_RETRY_COUNT = 2;
const RETRY_DELAY_MS = 350;

const sleep = (durationMs: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });

const isOffline = () => typeof navigator !== "undefined" && navigator.onLine === false;

const isRetryableStatus = (status?: number) => {
  if (!status) {
    return true;
  }

  return status >= 500 || status === 429 || status === 408;
};

const logHttp = (...args: unknown[]) => {
  if (env.ENABLE_HTTP_LOGS) {
    console.info("[http]", ...args);
  }
};

export const httpClient: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  (config.headers as Record<string, string>)["X-Requested-With"] = "XMLHttpRequest";

  if (isOffline()) {
    return Promise.reject(
      normalizeError({
        message: "Qurilma offline holatda. Ulanishni tekshiring.",
      })
    );
  }

  logHttp("request", config.method?.toUpperCase(), config.url);
  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    logHttp("response", response.status, response.config.url);
    return response;
  },
  async (error: AxiosError) => {
    const config = (error.config ?? {}) as RetryableConfig;

    if (!config.__retryCount) {
      config.__retryCount = 0;
    }

    const normalizedError = normalizeError(error);
    const status = error.response?.status;

    if (normalizedError.code === "unauthorized_error") {
      useAuthStore.getState().clearSession();
    }

    if (config.__retryCount < MAX_RETRY_COUNT && isRetryableStatus(status)) {
      config.__retryCount += 1;
      await sleep(RETRY_DELAY_MS * config.__retryCount);
      return httpClient(config);
    }

    return Promise.reject(normalizedError);
  }
);

export const unwrapResponse = <T>(promise: Promise<AxiosResponse<T>>) =>
  promise.then((response) => response.data);
