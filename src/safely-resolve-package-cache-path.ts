import { existsSync, mkdirSync } from "fs";
import { platform } from "os"
import { resolve } from "path";
import { getPackageName } from "./get-package-name";

export const npmInternalCacheDir = "_st_run";

export const safelyResolvePackageCachePath = (packageName: string, createCacheDirectory: boolean = true): string => {

    const stxCachePath = getStXCacheDirectory();

    if (!existsSync(stxCachePath)) {
        mkdirSync(stxCachePath);
    }

    const packageCachePath = resolve(stxCachePath, getPackageName(packageName));

    if (createCacheDirectory && !existsSync(packageCachePath)) {
        mkdirSync(packageCachePath);
    }
    return packageCachePath;
};

export const getStXCacheDirectory = (): string => {
    const baseCachePath = platform() !== "win32" ? resolve(process.env.HOME, ".npm") : resolve(process.env.APPDATA, "npm-cache");

    return resolve(baseCachePath, npmInternalCacheDir);
};