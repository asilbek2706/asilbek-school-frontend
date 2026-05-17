import { mockOk } from "@/shared/mocks/factory";

export const authSessionMockGateway = {
  getSession: async () => mockOk(null),
  revokeSession: async () => mockOk({ revoked: true }),
};
