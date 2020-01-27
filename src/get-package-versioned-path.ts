import {resolve} from "path";
import {safelyResolvePackageCachePath} from "./safely-resolve-package-cache-path";

export const getPackageVersionedPath = (packageName: string, version: string, createCacheDirectory: boolean = true): string => {
    const path = safelyResolvePackageCachePath(packageName, createCacheDirectory);
    return resolve(path, version);
};
