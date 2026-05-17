import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { aboutMockGateway } from "@/shared/mocks/about";
import { contactMockGateway } from "@/shared/mocks/contact";
import { homeMockGateway } from "@/shared/mocks/home";
import type { ApiResponse } from "@/shared/types/api-response";
import type { IContact } from "@/shared/types/contact";

export const contentRepository = {
  home: async (): Promise<ApiResponse<Record<string, unknown>>> => {
    if (env.USE_MOCK) {
      return homeMockGateway.content() as Promise<ApiResponse<Record<string, unknown>>>;
    }

    return unwrapResponse(httpClient.get<ApiResponse<Record<string, unknown>>>("/content/home"));
  },
  about: async (): Promise<ApiResponse<Record<string, unknown>>> => {
    if (env.USE_MOCK) {
      return aboutMockGateway.content() as Promise<ApiResponse<Record<string, unknown>>>;
    }

    return unwrapResponse(httpClient.get<ApiResponse<Record<string, unknown>>>("/content/about"));
  },
  contact: async (): Promise<ApiResponse<IContact[]>> => {
    if (env.USE_MOCK) {
      return contactMockGateway.list();
    }

    return unwrapResponse(httpClient.get<ApiResponse<IContact[]>>("/content/contact"));
  },
};
