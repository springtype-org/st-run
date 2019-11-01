import { deletePathOrFile } from "st-rm-rf";
import { getPackageVersionedPath } from "./get-package-versioned-path";
import { safelyResolvePackageCachePath } from "./safely-resolve-package-cache-path";

export const invalidatePackageCachePath = (packageName: string, version?: string): string => {
  let path: string;
  if (version) {
    path = getPackageVersionedPath(packageName, version);
  } else {
    path = safelyResolvePackageCachePath(packageName);
  }
  deletePathOrFile(path);
  return path;
};
