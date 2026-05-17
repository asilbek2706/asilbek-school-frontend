import { mockOk } from "@/shared/mocks/factory";
import { faqData } from "./faq.mock";

export const faqMockGateway = {
  list: async () => mockOk(faqData),
};
