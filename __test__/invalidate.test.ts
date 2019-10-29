import { existsSync, mkdirSync } from "fs";
import { resolve, sep } from "path";
import { invalidatePackageCachePath } from "../dist/invalidate-package-cache";
import { npmInternalCacheDir, safelyResolvePackageCachePath } from "../dist/safely-resolve-package-cache-path";

describe("invalidates the cache", () => {
  const resolveTestPackagePath = () => safelyResolvePackageCachePath("_foohoobar");

  beforeEach(() => {
    const packagePath = resolveTestPackagePath();
    if (!existsSync(packagePath)) {
      mkdirSync(packagePath);
    }

    const specificVersionPath = resolve(resolveTestPackagePath(), "1.0.0");
    if (!existsSync(specificVersionPath)) {
      mkdirSync(specificVersionPath);
    }
  });

  it("invalidates the cache for a specific version", () => {
    const invalidatedPath = invalidatePackageCachePath("st-cp", "1.0.0");

    expect(invalidatedPath).toBeDefined();
    expect(invalidatedPath.endsWith(`${npmInternalCacheDir}${sep}st-cp${sep}1.0.0`)).toBeTruthy();
    expect(existsSync(invalidatedPath)).toBeFalsy();
  });

  it("invalidates the cache for all versions", () => {
    const invalidatedPath = invalidatePackageCachePath("st-cp");

    expect(invalidatedPath).toBeDefined();
    expect(invalidatedPath.endsWith(`${npmInternalCacheDir}${sep}st-cp`)).toBeTruthy();
    expect(existsSync(invalidatedPath)).toBeFalsy();
  });
});
