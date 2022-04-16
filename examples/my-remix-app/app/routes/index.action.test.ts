import { vi } from "vitest";
import { createActionRequest } from "remix-testing-utils";
import { action } from ".";

afterAll(() => {
  vi.clearAllMocks();
});

test("should returns the sent data as a return value", async () => {
  const request = createActionRequest("http://localhost:3000/", {
    value: "Hello, World",
  });

  const response = await action({
    request,
    context: {},
    params: {},
  });
  const data = JSON.parse(response.body);
  expect(data.value).toBe("Hello, World");
});
