
const chalk = require("chalk");
import { execute, executeSync } from "./execute";
import { fetchLatestPackageVersion } from "./fetch-latest-package-version";
import { getExecutablePath } from "./get-executable-file";
import { getLatestInstalledVersion } from "./get-latest-installed-version";
import { getPackageVersionedPath } from "./get-package-versioned-path";
import { installPackage } from "./install-package";
import { installPeerDependencies } from "./install-peer-dependencies";
import { isOnline } from "./is-online";
import { isPackageInstalled } from "./is-package-installed";
export const installAndExecute = async (packageName: string, args: Array<string>) => {
  // support for system:$command syntax
  if (!packageName) {
    console.log(chalk.red("Nothing to run..."));
    process.exit(1);
  }
  if (packageName.startsWith("system:")) {
    packageName = packageName.substring(7);

    await execute([packageName, ...args]);
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

  let latestInstalledVersion = getLatestInstalledVersion(packageName);
  let versionToUse: string;

  if (await isOnline()) {
    if (!specificRequestedVersion) {
      versionToUse = await fetchLatestPackageVersion(packageName);
      if (!latestInstalledVersion) {
        console.log("[i] Package is not installed. Installing: ", versionToUse, "...");
        await installPackage(packageName, versionToUse);
      } else {
        console.log("[i] Latest installed version is: ", latestInstalledVersion);

        if (versionToUse !== latestInstalledVersion) {
          console.log("[i] Cached version is out of date. Installing: ", versionToUse, "...");
          await installPackage(packageName, versionToUse);
        }
      }
    } else {
      versionToUse = await fetchLatestPackageVersion(`${packageName}@${specificRequestedVersion}`);
      if (!isSpecificRequestedVersionInstalled) {
        console.log("[i] Specific version is not installed. Installing: ", specificRequestedVersion, "...");
        await installPackage(packageName, specificRequestedVersion);
      }
    }
  } else {
    if (!specificRequestedVersion) {
      if (!latestInstalledVersion) {
        console.log("[!] Offline mode: Package is not installed. Exiting.");
        process.exit(1);
      }
      versionToUse = latestInstalledVersion;
    } else {
      if (!isSpecificRequestedVersionInstalled) {
        console.log("[!] Offline mode: Specific version is not installed. Exiting.");
        process.exit(1);
      }
      versionToUse = specificRequestedVersion;
    }
  }

  const installedPackagePath = getPackageVersionedPath(packageName, versionToUse);
  const executable = getExecutablePath(packageName, installedPackagePath);

  try {
    await installPeerDependencies(packageName, installedPackagePath);
  } catch (e) {
    console.log(chalk.red("-> error installing peer dependencies."));
    process.exit(1);
  }

  try {
    // process.execPath -> node executable
    executeSync([`"${process.execPath}"`, `${executable}`, ...args], {
      stdio: "inherit",
    });
  } catch (e) {
    console.log(chalk.red("-> unexpected termination."));
  }
};
