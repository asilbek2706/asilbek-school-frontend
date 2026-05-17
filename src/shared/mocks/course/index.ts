import { mockOk } from "@/shared/mocks/factory";
import { courses } from "./course.mock";

export const courseMockGateway = {
  list: async () => mockOk(courses),
  detailBySlug: async (slug: string) =>
    mockOk(courses.find((course) =>
      course.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") === slug
    ) ?? null),
};
