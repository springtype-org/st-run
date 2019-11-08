import {resolve} from "path";
import {safelyResolvePackageCachePath} from "./safely-resolve-package-cache-path";

export const getPackageVersionedPath = (packageName: string, version: string): string => {
    const path = safelyResolvePackageCachePath(packageName);
    return resolve(path, version);
};
