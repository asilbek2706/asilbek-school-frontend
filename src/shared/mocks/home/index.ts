import { mockOk } from "@/shared/mocks/factory";
import { faqData } from "@/shared/mocks/faq/faq.mock";
import { paths } from "./learning-path.mock";
import { technologies } from "./technologies.mock";
import { testimonials } from "./testimonials.mock";

export const homeMockGateway = {
  content: async () =>
    mockOk({
      faq: faqData,
      learningPath: paths,
      technologies,
      testimonials,
    }),
};
