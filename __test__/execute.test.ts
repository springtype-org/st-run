import { execute } from "../src";

describe("executes an arbitrary global program", () => {
  it("run npm show npm", () => {
    const result = execute(["npm", "show", "npm"]);
    expect(result).toBeDefined();
  });
});
