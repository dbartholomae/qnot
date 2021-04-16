import { convertPathToUrl } from "./convertPathToUrl";

describe("convertPathToUrl", () => {
  it("converts a path to a url", () => {
    expect(convertPathToUrl("/foo")).toBe("http://localhost/foo");
  });
});
