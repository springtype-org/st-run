import { execute } from "./execute";
import { fetchLastestPackageVersion } from "./fetch-latest-package-version";
import { getExecutablePath } from "./get-executable-file";
import { getLatestInstalledVersion } from "./get-latest-installed-version";
import { getPackageVersionedPath } from "./get-package-versioned-path";
import { installPackage } from "./install-package";
import { isOnline } from "./is-online";
export const installAndExecute = async (packageName: string, args: Array<string>) => {
  const latestInstalledVersion = getLatestInstalledVersion(packageName);
  let latestAvailableVersion: string;

  if (await isOnline()) {
    latestAvailableVersion = fetchLastestPackageVersion(packageName);

    if (!latestInstalledVersion) {
      console.log("[i] Package is not installed. Installing: ", latestAvailableVersion, "...");
      installPackage(packageName);
      latestAvailableVersion = fetchLastestPackageVersion(packageName);
    } else {
      console.log("[i] Latest installed version is: ", latestInstalledVersion);
    }

    if (latestAvailableVersion !== latestInstalledVersion) {
      console.log("[i] Cached version is out of date. Installing: ", latestAvailableVersion, "...");
      installPackage(packageName, latestAvailableVersion);
      latestAvailableVersion = fetchLastestPackageVersion(packageName);
    }
  } else {
    console.log("[!!] Warning: System is offline. Using local cache version: ", latestInstalledVersion);

    if (!latestInstalledVersion) {
      console.log("[i] Package is not installed. Exiting.");
      process.exit(1);
    }
    latestAvailableVersion = latestInstalledVersion;
  }
  
  const installedPackagePath = getPackageVersionedPath(packageName, latestAvailableVersion);
  const executable = getExecutablePath(packageName, installedPackagePath);

  // process.execPath -> node executable
  execute(process.execPath, [executable, ...args], {
    stdio: "inherit",
  });
};
