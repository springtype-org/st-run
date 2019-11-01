import {resolve} from "path";

export const getExecutablePath = (packageName: string, versionedPackageCachePath: string) => {
    if (process.platform === "win32") {
        return resolve(versionedPackageCachePath, 'node_modules', packageName);
    } else {
        return resolve(versionedPackageCachePath, 'node_modules', '.bin', packageName);
    }
};
