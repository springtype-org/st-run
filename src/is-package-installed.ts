import { existsSync } from 'fs';
import { getPackageVersionedPath } from './get-package-versioned-path';
export const isPackageInstalled = (packageName: string, version: string) => {
    const packageVersionedCachePath = getPackageVersionedPath(packageName, version);
    return !!existsSync(packageVersionedCachePath);
}