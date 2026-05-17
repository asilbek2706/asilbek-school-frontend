import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { profileMockGateway } from "@/shared/mocks/profile";
import type { ApiResponse } from "@/shared/types/api-response";

type Profile = {
  id: string;
  role: string;
  firstName: string;
  lastName: string;
};

export const profileRepository = {
  getProfile: async (): Promise<ApiResponse<Profile>> => {
    if (env.USE_MOCK) {
      return profileMockGateway.get();
    }

    return unwrapResponse(httpClient.get<ApiResponse<Profile>>("/profile"));
  },
};
