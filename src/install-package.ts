import { writeFileSync } from "fs";
import { resolve } from "path";
import { mkdir } from "st-mkdir";
import { executeSync } from "./execute";
import { getPackageVersionedPath } from "./get-package-versioned-path";
import { invalidatePackageCachePath } from "./invalidate-package-cache";
import { osPath } from "./os-path";
import { safelyResolvePackageCachePath } from "./safely-resolve-package-cache-path";
export const latestInstalledVersionCacheFileName = "latest_installed_version";

export const installPackage = async (packageName: string, version: string): Promise<string> => {
  invalidatePackageCachePath(packageName);
  const installCachePath = getPackageVersionedPath(packageName, version);

  mkdir(resolve(installCachePath));

  writeFileSync(
    resolve(installCachePath, "package.json"),
    `{
        "name": "packageName",
        "version": "1.0.0",
        "description": "auto",
        "repository": "auto",
        "license": "ISC"
    }`,
  );

  writeFileSync(resolve(installCachePath, "README"), `auto`);

  executeSync(["npm", "install", `${packageName}@${version}`, "--prefix", `"${installCachePath}"`]);

  // write version into cache file for offline cache resolve
  writeFileSync(osPath.resolve(safelyResolvePackageCachePath(packageName), latestInstalledVersionCacheFileName), version);

  return installCachePath;
};
