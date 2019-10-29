import { sep } from "path";
import { fetchLastestPackageVersion } from "../dist/fetch-latest-package-version";
import { isPackageInstalled } from "../dist/is-package-installed";
import { getPackageVersionedPath } from "./../dist/get-package-versioned-path";
import { npmInternalCacheDir, resolvePackageCachePath } from "./../dist/resolve-package-cache-path";
import { invalidatePackageCachePath } from "./../src/invalidate-package-cache";

describe("resolve package cache path", () => {
  it("returns a valid cache path", () => {
    const packageCachePath = resolvePackageCachePath("st-cp");
    expect(packageCachePath).toBeDefined();
    expect(packageCachePath.endsWith(`${npmInternalCacheDir}${sep}st-cp`)).toBeTruthy();
  });

  it("resolve and create versioned path", () => {
    const versionedPath = getPackageVersionedPath("st-cp", "1.0.0");
    expect(versionedPath.endsWith(`${npmInternalCacheDir}${sep}st-cp${sep}1.0.0`)).toBeTruthy();
  });

  it("safely checks if a package is installed in a specific version", () => {
    const isInstalled = isPackageInstalled("st-cp", "15.0.0");
    expect(isInstalled).toBeFalsy();
  });

  it("safely checks if the latest package is installed", () => {
    invalidatePackageCachePath("st-cp");
    const latestVersion = fetchLastestPackageVersion("st-cp");
    const isItInstalled = isPackageInstalled("st-cp", latestVersion);
    invalidatePackageCachePath("st-cp", latestVersion);
    expect(isItInstalled).toBeFalsy();
  });
});
