import { fetchLatestPackageVersion } from "./../dist/fetch-latest-package-version";

describe("fetch", () => {
  it("fetches the latest version of st-cp", () => {
    const latestPackageVersion = fetchLatestPackageVersion("st-cp");
    expect(latestPackageVersion).toBeDefined();
  });
});
