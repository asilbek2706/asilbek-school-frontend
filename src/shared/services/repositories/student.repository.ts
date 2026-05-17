import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { studentMockGateway } from "@/shared/mocks/student";
import type { ApiResponse } from "@/shared/types/api-response";

export const studentRepository = {
  list: async (): Promise<ApiResponse<unknown[]>> => {
    if (env.USE_MOCK) {
      return studentMockGateway.list();
    }

    return unwrapResponse(httpClient.get<ApiResponse<unknown[]>>("/students"));
  },
};
