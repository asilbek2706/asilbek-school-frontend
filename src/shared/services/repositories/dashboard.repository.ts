import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { dashboardMockGateway } from "@/shared/mocks/dashboard";
import type { ApiResponse } from "@/shared/types/api-response";

type DashboardSummary = {
  students: number;
  teachers: number;
  attendanceRate: number;
  announcements: number;
};

export const dashboardRepository = {
  summary: async (): Promise<ApiResponse<DashboardSummary>> => {
    if (env.USE_MOCK) {
      return dashboardMockGateway.summary();
    }

    return unwrapResponse(httpClient.get<ApiResponse<DashboardSummary>>("/dashboard/summary"));
  },
};
