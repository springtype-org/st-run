import {sep} from "path";
import {
    fetchLatestPackageVersion,
    isPackageInstalled,
    npmInternalCacheDir, safelyResolvePackageCachePath,
    invalidatePackageCachePath,
    getPackageVersionedPath
} from "../src";

describe("resolve package cache path", () => {
    it("returns a valid cache path", () => {
        const packageCachePath = safelyResolvePackageCachePath("st-cp");
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

    it("safely checks if the latest package is installed", async () => {
        invalidatePackageCachePath("st-cp");
        const latestVersion = await fetchLatestPackageVersion("st-cp");
        const isItInstalled = isPackageInstalled("st-cp", latestVersion);
        invalidatePackageCachePath("st-cp", latestVersion);
        expect(isItInstalled).toBeFalsy();
    });
});
