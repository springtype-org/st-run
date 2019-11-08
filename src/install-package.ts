import {writeFileSync} from "fs";
import {execute} from "./execute";
import {getPackageVersionedPath} from "./get-package-versioned-path";
import {invalidatePackageCachePath} from "./invalidate-package-cache";
import {safelyResolvePackageCachePath} from "./safely-resolve-package-cache-path";
import {osPath} from "./os-path";

export const latestInstalledVersionCacheFileName = "latest_installed_version";

export const installPackage = async (packageName: string, version: string): Promise<string> => {
    console.log('installPackage', packageName, version);
    invalidatePackageCachePath(packageName);

    const installCachePath = getPackageVersionedPath(packageName, version);
    await execute(["npm", "install", `${packageName}@${version}`, "--prefix", `"${installCachePath}"`]);
    // write version into cache file for offline cache resolve
    writeFileSync(osPath.resolve(safelyResolvePackageCachePath(packageName), latestInstalledVersionCacheFileName), version);
    return installCachePath;
};
