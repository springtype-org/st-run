import { writeFileSync } from "fs";
import { resolve } from "path";
import { execute } from "./execute";
import { getPackageVersionedPath } from "./get-package-versioned-path";
import { invalidatePackageCachePath } from "./invalidate-package-cache";
import { safelyResolvePackageCachePath } from "./safely-resolve-package-cache-path";

export const latestInstalledVersionCacheFileName = "latest_installed_version";

export const installPackage = (packageName: string, version: string = "latest"): string => {
  invalidatePackageCachePath(packageName);

  const installCachePath = getPackageVersionedPath(packageName, version);
  execute("yarn", ["add", `${packageName}@${version}`, "--cwd", installCachePath]);
  // write version into cache file for offline cache resolve
  writeFileSync(resolve(safelyResolvePackageCachePath(packageName), latestInstalledVersionCacheFileName), version);
  return installCachePath;
};
