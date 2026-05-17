import { mockOk } from "@/shared/mocks/factory";

export const dashboardMockGateway = {
  summary: async () =>
    mockOk({
      students: 124,
      teachers: 14,
      attendanceRate: 94,
      announcements: 6,
    }),
};
