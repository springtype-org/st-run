import {readFileSync} from "fs";
import {resolve} from 'path';
import {latestInstalledVersionCacheFileName} from './install-package';
import {safelyResolvePackageCachePath} from './safely-resolve-package-cache-path';

export const getLatestInstalledVersion = (packageName: string) => {
    try {
        return readFileSync(resolve(safelyResolvePackageCachePath(packageName), latestInstalledVersionCacheFileName), 'utf8').trim()
    } catch (e) {
        return null;
    }
};