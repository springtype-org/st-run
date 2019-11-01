import {resolve} from "path";
import {platform} from "os"

export const getExecutablePath = (packageName: string, versionedPackageCachePath: string) => {
    if (platform() === "win32") {
        return resolve(versionedPackageCachePath, 'node_modules', packageName, 'cli.js');
    } else {
        return resolve(versionedPackageCachePath, 'node_modules', '.bin', packageName);
    }
};
