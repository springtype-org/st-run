import { existsSync, unlinkSync } from "fs";
import { installAndExecute } from "../dist/install-and-execute";

describe("installs and executes an arbitrary npm module that has a 'bin'", () => {
  beforeEach(() => {
    unlinkSync("dist/cli2.js");
  });

  it("installs and runs st-cp", async () => {
    await installAndExecute("st-cp", ["dist/cli.js", "dist/cli2.js"]);
    expect(existsSync("dist/cli2.js")).toBeTruthy();
  });
});