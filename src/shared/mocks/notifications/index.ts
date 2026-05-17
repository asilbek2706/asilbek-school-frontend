import { mockOk } from "@/shared/mocks/factory";

export const notificationMockGateway = {
  list: async () =>
    mockOk([
      { id: "n1", title: "New lesson published", read: false },
      { id: "n2", title: "Attendance report ready", read: true },
    ]),
};
