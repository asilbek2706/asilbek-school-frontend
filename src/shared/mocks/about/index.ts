import { mockOk } from "@/shared/mocks/factory";
import { goals } from "./our-goals.mock";
import { steps } from "./teaching-roadmap.mock";
import { values } from "./core-values.mock";

export const aboutMockGateway = {
  content: async () =>
    mockOk({
      goals,
      values,
      roadmap: steps,
    }),
};
