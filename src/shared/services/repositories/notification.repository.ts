import { env } from "@/shared/config/env";
import { httpClient, unwrapResponse } from "@/shared/api";
import { notificationMockGateway } from "@/shared/mocks/notifications";
import type { ApiResponse } from "@/shared/types/api-response";

type NotificationItem = {
  id: string;
  title: string;
  read: boolean;
};

export const notificationRepository = {
  list: async (): Promise<ApiResponse<NotificationItem[]>> => {
    if (env.USE_MOCK) {
      return notificationMockGateway.list();
    }

    return unwrapResponse(httpClient.get<ApiResponse<NotificationItem[]>>("/notifications"));
  },
};
