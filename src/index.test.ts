import { vi } from "vitest";

afterEach(() => {
  vi.clearAllMocks();
});

test("Smoke Test", () => {
  expect(1 + 2).toBe(3);
});
