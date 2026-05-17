const readBool = (value: string | undefined, fallback: boolean) => {
  if (value == null) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }

  return fallback;
};

export const env = {
  get API_BASE_URL() {
    return import.meta.env.VITE_API_BASE_URL ?? "/api";
  },
  get API_TIMEOUT_MS() {
    return Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 15000);
  },
  get USE_MOCK() {
    return readBool(import.meta.env.VITE_USE_MOCK, true);
  },
  get ENABLE_HTTP_LOGS() {
    return readBool(import.meta.env.VITE_ENABLE_HTTP_LOGS, import.meta.env.DEV);
  },
};
