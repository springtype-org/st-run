import { execute } from "./execute";
import { fetchLastestPackageVersion } from "./fetch-latest-package-version";
import { getExecutablePath } from "./get-executable-file";
import { getLatestInstalledVersion } from "./get-latest-installed-version";
import { getPackageVersionedPath } from "./get-package-versioned-path";
import { installPackage } from "./install-package";
import { isOnline } from "./is-online";
import { isPackageInstalled } from "./is-package-installed";
export const installAndExecute = async (packageName: string, args: Array<string>) => {
  // support for system:$command syntax
  if (packageName.startsWith("system:")) {
    packageName = packageName.substring(7);

    execute(packageName, args, {
      stdio: "inherit",
    });
    return;
  }

  // support for command@$specificVersion syntax
  const packageNameAndVersion = packageName.split("@");
  let specificRequestedVersion, isSpecificRequestedVersionInstalled;

  if (packageNameAndVersion[1]) {
    packageName = packageNameAndVersion[0];
    specificRequestedVersion = packageNameAndVersion[1];
    isSpecificRequestedVersionInstalled = isPackageInstalled(packageName, specificRequestedVersion);
  }

  const latestInstalledVersion = getLatestInstalledVersion(packageName);
  let versionToUse: string;

  if (await isOnline()) {
    if (!specificRequestedVersion) {
      versionToUse = fetchLastestPackageVersion(packageName);

      if (!latestInstalledVersion) {
        console.log("[i] Package is not installed. Installing: ", versionToUse, "...");
        installPackage(packageName);
        versionToUse = fetchLastestPackageVersion(packageName);
      } else {
        console.log("[i] Latest installed version is: ", latestInstalledVersion);
      }

      if (versionToUse !== latestInstalledVersion) {
        console.log("versionToUse", versionToUse, "!= latestInstalledVersion", latestInstalledVersion);

        console.log("[i] Cached version is out of date. Installing: ", versionToUse, "...");
        installPackage(packageName, versionToUse);
        versionToUse = fetchLastestPackageVersion(packageName);
      }
    } else {
      if (!isSpecificRequestedVersionInstalled) {
        console.log("[i] Specific version is not installed. Installing: ", specificRequestedVersion, "...");
        installPackage(packageName, specificRequestedVersion);
        versionToUse = specificRequestedVersion;
      }
    }
  } else {
    if (!specificRequestedVersion) {
      console.log("[!!] Warning: Machine is offline. Using local cache version: ", latestInstalledVersion);

      if (!latestInstalledVersion) {
        console.log("[i] Package is not installed. Exiting.");
        process.exit(1);
      }
      versionToUse = latestInstalledVersion;
    } else {
      if (!isSpecificRequestedVersionInstalled) {
        console.log("[i] Specific version is not installed. Exiting.");
        process.exit(1);
      }
      versionToUse = specificRequestedVersion;
    }
  }

  const installedPackagePath = getPackageVersionedPath(packageName, versionToUse);
  const executable = getExecutablePath(packageName, installedPackagePath);

  // process.execPath -> node executable
  execute(process.execPath, [executable, ...args], {
    stdio: "inherit",
  });
};
