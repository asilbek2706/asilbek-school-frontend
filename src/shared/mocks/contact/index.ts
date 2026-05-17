import { mockOk } from "@/shared/mocks/factory";
import { contactData } from "./contact.mock";

export const contactMockGateway = {
  list: async () => mockOk(contactData),
};
