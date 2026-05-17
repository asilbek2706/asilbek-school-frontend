import { mockOk } from "@/shared/mocks/factory";

export const teacherMockGateway = {
  list: async () => mockOk([]),
};
