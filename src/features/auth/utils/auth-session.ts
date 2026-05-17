import type { AuthSessionSnapshot } from "@/features/auth/types/auth.types";

import {
  AUTH_COOKIE_NAME,
  AUTH_SESSION_COOKIE_NAME,
  AUTH_TOKEN_TTL_SECONDS,
} from "./auth.constants";

const getCookiePair = (name: string, value: string, maxAge: number) =>
  `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;

export const serializeAuthSession = (session: AuthSessionSnapshot) =>
  encodeURIComponent(JSON.stringify(session));

export const deserializeAuthSession = (
  rawValue: string | null | undefined
): AuthSessionSnapshot | null => {
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(rawValue)) as AuthSessionSnapshot;
  } catch {
    return null;
  }
};

export const parseAuthSessionFromCookieHeader = (
  cookieHeader: string | null
): AuthSessionSnapshot | null => {
  if (!cookieHeader) {
    return null;
  }

  const sessionCookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_SESSION_COOKIE_NAME}=`));

  if (!sessionCookie) {
    return null;
  }

  return deserializeAuthSession(sessionCookie.split("=").slice(1).join("="));
};

export const readClientAuthSession = (): AuthSessionSnapshot | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const matchedCookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_SESSION_COOKIE_NAME}=`));

  return deserializeAuthSession(matchedCookie?.split("=").slice(1).join("="));
};

export const applyClientAuthSession = (session: AuthSessionSnapshot) => {
  if (typeof document === "undefined") {
    return;
  }

  const serializedSession = serializeAuthSession(session);
  document.cookie = getCookiePair(AUTH_COOKIE_NAME, "1", AUTH_TOKEN_TTL_SECONDS);
  document.cookie = getCookiePair(AUTH_SESSION_COOKIE_NAME, serializedSession, AUTH_TOKEN_TTL_SECONDS);
};

export const clearClientAuthSession = () => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
  document.cookie = `${AUTH_SESSION_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
};

export const clearClientCookie = (name: string) => {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
};

export const getAuthCookieHeaderValue = (session: AuthSessionSnapshot) =>
  `${AUTH_COOKIE_NAME}=1; ${AUTH_SESSION_COOKIE_NAME}=${serializeAuthSession(session)}`;

export const buildAvatarUrl = (fullName: string, email: string) => {
  const seed = fullName.trim() || email.trim() || "Asilbek School";

  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}`;
};

export const delay = (milliseconds: number) =>
  new Promise((resolve) => {
    globalThis.setTimeout(resolve, milliseconds);
  });
