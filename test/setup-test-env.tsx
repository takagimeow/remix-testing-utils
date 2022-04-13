import { installGlobals } from "@remix-run/node/globals";
import "@testing-library/jest-dom/extend-expect";
import { vi } from "vitest";

installGlobals();
vi.mock("~/services/db.server", () => {
  return {
    prisma: {},
  };
});
vi.mock("@node-rs/bcrypt", () => {
  return {
    hash: vi.fn().mockRejectedValue("password-hash"),
    verify: vi.fn().mockReturnValue(true),
  };
});
vi.mock("@remix-run/react", () => {
  // mock whatever remix APIs you're using
  return {
    Form: (props: React.RefAttributes<HTMLFormElement>) => <form {...props} />,
    Link: (props: any) => <a {...props} />,
    useLoaderData: vi.fn(),
    useLocation: vi.fn(() => ({ key: Math.random().toString(32).slice(2) })),
  };
});
vi.mock("react-intersection-observer", () => {
  return {
    useInView: vi.fn(() => ({
      ref: null as any,
      inView: true,
      entry: {} as any,
    })),
  };
});
