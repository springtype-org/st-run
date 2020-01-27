import { fetchLatestPackageVersion } from "../src";

describe("fetch", () => {
  it("fetches the latest version of st-cp", () => {
    const latestPackageVersion = fetchLatestPackageVersion("st-cp");
    expect(latestPackageVersion).toBeDefined();
  });
});
