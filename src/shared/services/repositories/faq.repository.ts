import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { faqMockGateway } from "@/shared/mocks/faq";
import type { FaqItem } from "@/entities/faq/model/types";
import type { ApiResponse } from "@/shared/types/api-response";

export const faqRepository = {
  list: async (): Promise<ApiResponse<FaqItem[]>> => {
    if (env.USE_MOCK) {
      return faqMockGateway.list();
    }

    return unwrapResponse(httpClient.get<ApiResponse<FaqItem[]>>("/faq"));
  },
};
