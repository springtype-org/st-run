import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { mkdir } from "st-mkdir";
import { executeSync } from "./execute";
import { getPackageVersionedPath } from "./get-package-versioned-path";
import { invalidatePackageCachePath } from "./invalidate-package-cache";
import { osPath } from "./os-path";
import { safelyResolvePackageCachePath } from "./safely-resolve-package-cache-path";
import { deletePathOrFile } from "st-rm-rf";

export const latestInstalledVersionCacheFileName = "latest_installed_version";

export const installPackage = async (packageName: string, version: string): Promise<string> => {
  //invalidatePackageCachePath(packageName);
  const installCachePath = getPackageVersionedPath(packageName, version);

  try {
    // clean cache
    deletePathOrFile(installCachePath);
  } catch (e) { }

  mkdir(resolve(installCachePath));

  const targetPackageJSONPath = resolve(installCachePath, "package.json");

  writeFileSync(resolve(installCachePath, "README"), `auto`);

  writeFileSync(
    targetPackageJSONPath,
    JSON.stringify({
      "name": '_install_' + packageName,
      "version": version,
      "description": "auto",
      "repository": "auto",
      "license": "ISC"
    }, null, 4),
    {
      encoding: 'utf8'
    }
  );

  executeSync(["npm", "install", `${packageName}@${version}`, "--prefix", `"${installCachePath}"`]);


  // write version into cache file for offline cache resolve
  writeFileSync(osPath.resolve(safelyResolvePackageCachePath(packageName), latestInstalledVersionCacheFileName), version);

  return installCachePath;
};
