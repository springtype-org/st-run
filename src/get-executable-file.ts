import { resolve } from "path";

export const getExecutablePath = (packageName: string, versionedPackageCachePath: string) => {
  return resolve(versionedPackageCachePath, 'node_modules', '.bin', packageName);
};
