import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";

export const npmInternalCacheDir = "_stx";

export const safelyResolvePackageCachePath = (packageName: string): string => {
  const baseCachePath = process.platform !== "win32" ? resolve(process.env.HOME, ".npm") : resolve(process.env.APPDATA, "npm-cache");

  const stxCachePath = resolve(baseCachePath, npmInternalCacheDir);

  if (!existsSync(stxCachePath)) {
    mkdirSync(stxCachePath);
  }

  const packageCachePath = resolve(stxCachePath, packageName);

  if (!existsSync(packageCachePath)) {
    mkdirSync(packageCachePath);
  }
  return packageCachePath;
};
