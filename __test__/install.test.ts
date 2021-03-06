import {existsSync} from "fs";
import {sep} from "path";
import {
    invalidatePackageCachePath,
    npmInternalCacheDir,
    getLatestInstalledVersion,
    installPackage,
    getExecutablePath
} from '../src';
import { createHash } from "crypto";

describe("installs packages in cache", () => {

    beforeEach(() => {
        invalidatePackageCachePath('st-cp');
    });

    it("install st-cp in stx cache path", async () => {
        const installedPackagePath = await installPackage("st-cp","latest");
        expect(installedPackagePath).toBeDefined();
        expect(installedPackagePath.indexOf(`${npmInternalCacheDir}${sep}st-cp${sep}`) > -1).toBeTruthy();
        // must have written version cache file
        expect(getLatestInstalledVersion("st-cp") === 'latest').toBeTruthy();

        // and installed package in cache directory
        expect(existsSync(installedPackagePath)).toBeTruthy();
        expect(existsSync(getExecutablePath("st-cp", installedPackagePath))).toBeTruthy();
    });

    it("install specific verison of st-cp in stx cache path", async () => {
        const installedPackagePath = await installPackage("st-cp", "1.0.0-alpha.1.58");
        expect(installedPackagePath).toBeDefined();
        expect(installedPackagePath.indexOf(`${npmInternalCacheDir}${sep}st-cp${sep}`) > -1).toBeTruthy();
        // must have written version cache file
        expect(getLatestInstalledVersion("st-cp") === '1.0.0-alpha.1.58').toBeTruthy();

        // and installed package in cache directory
        expect(existsSync(installedPackagePath)).toBeTruthy();
        expect(existsSync(getExecutablePath("st-cp", installedPackagePath))).toBeTruthy();
    });
});
