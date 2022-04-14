import { vi } from "vitest";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { json } from "@remix-run/node";
import { createActionRequest, createLoaderRequest } from "./requests";

afterAll(() => {
  vi.clearAllMocks();
});

type LoaderData = {
  session: string;
};

const loader: LoaderFunction = async ({ request }) => {
  const headers = request.headers;
  const cookie = headers.get("cookie");

  let session = "";
  if (cookie) {
    const matched = cookie.toString().match(/__session=(.*)/);
    session = matched ? matched[1] : "";
  }
  return json<LoaderData>({
    session,
  });
}

type ActionData = {
  id: string;
  name: string;
};
const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  const name = formData.get("name");

  return json<ActionData>({
    id: id ? id.toString() : "",
    name: name ? name.toString() : "",
  });
};

test("The value set in the body of the request can be read in the action function.", async () => {
  const req = createActionRequest("http://localhost:3000/", {
    id: "user-id",
    name: "user-name",
  });

  const res = await action({
    request: req,
    context: {},
    params: {},
  });
  const data = JSON.parse(res.body);
  expect(data.id).toBe("user-id");
  expect(data.name).toBe("user-name");
});

test("The value set in the request header can be read in the loader function.", async () => {
  const req = createLoaderRequest("http://localhost:3000/", {
    cookie: "__session=helloworld"
  });
  const res = await loader({
    request: req,
    context: {},
    params: {},
  })
  const data = JSON.parse(res.body);
  expect(data.session).toBe("helloworld");
})