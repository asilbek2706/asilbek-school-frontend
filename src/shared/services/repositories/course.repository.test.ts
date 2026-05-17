import { describe, expect, it } from "vitest";

import { courseRepository } from "./course.repository";

describe("courseRepository", () => {
  it("returns contract-shaped response", async () => {
    const response = await courseRepository.list();

    expect(response.success).toBe(true);
    expect(Array.isArray(response.data)).toBe(true);
    expect(Array.isArray(response.errors)).toBe(true);
    expect(response.meta).toBeTruthy();
  });
});
