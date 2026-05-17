import { mockOk } from "@/shared/mocks/factory";

export const studentMockGateway = {
  list: async () => mockOk([]),
};
