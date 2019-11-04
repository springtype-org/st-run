import {resolve} from "path";
import {platform} from "os"
import {readPackageJson} from "./read-package-json";

export const getExecutablePath = (packageName: string, versionedPackageCachePath: string) => {
    if (platform() === "win32") {
        const modulePath = resolve(versionedPackageCachePath, 'node_modules', packageName);
        const bin = readPackageJson(modulePath).bin || {};
        const executionJs = bin[packageName];
        return  resolve(modulePath,executionJs);
    } else {
        return resolve(versionedPackageCachePath, 'node_modules', '.bin', packageName);
    }
};
