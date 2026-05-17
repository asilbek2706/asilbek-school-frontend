import { http, HttpResponse } from "msw";

import { courses } from "@/shared/mocks/course/course.mock";
import { faqData } from "@/shared/mocks/faq/faq.mock";

export const handlers = [
  http.get("/api/courses", () =>
    HttpResponse.json({
      success: true,
      data: courses,
      meta: { source: "msw" },
      errors: [],
    })
  ),
  http.get("/api/faq", () =>
    HttpResponse.json({
      success: true,
      data: faqData,
      meta: { source: "msw" },
      errors: [],
    })
  ),
];
