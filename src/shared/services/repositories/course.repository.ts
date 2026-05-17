import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { courseMockGateway } from "@/shared/mocks/course";
import type { Course } from "@/entities/course/model/types";
import type { ApiResponse } from "@/shared/types/api-response";

export const courseRepository = {
  list: async (): Promise<ApiResponse<Course[]>> => {
    if (env.USE_MOCK) {
      return courseMockGateway.list();
    }

    return unwrapResponse(httpClient.get<ApiResponse<Course[]>>("/courses"));
  },
};
