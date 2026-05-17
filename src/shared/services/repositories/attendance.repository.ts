import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { mockOk } from "@/shared/mocks/factory";
import type { ApiResponse } from "@/shared/types/api-response";

const attendanceMockGateway = {
  list: async () => mockOk([] as unknown[]),
};

export const attendanceRepository = {
  list: async (): Promise<ApiResponse<unknown[]>> => {
    if (env.USE_MOCK) {
      return attendanceMockGateway.list();
    }

    return unwrapResponse(httpClient.get<ApiResponse<unknown[]>>("/attendance"));
  },
};
