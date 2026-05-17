import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { teacherMockGateway } from "@/shared/mocks/teacher";
import type { ApiResponse } from "@/shared/types/api-response";

export const teacherRepository = {
  list: async (): Promise<ApiResponse<unknown[]>> => {
    if (env.USE_MOCK) {
      return teacherMockGateway.list();
    }

    return unwrapResponse(httpClient.get<ApiResponse<unknown[]>>("/teachers"));
  },
};
