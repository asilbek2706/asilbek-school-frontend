import { mockOk } from "@/shared/mocks/factory";

export const profileMockGateway = {
  get: async () =>
    mockOk({
      id: "demo-user",
      role: "student",
      firstName: "Asilbek",
      lastName: "Demo",
    }),
};
