import {resolve} from "path";
import {readPackageJson} from "./read-package-json";
import chalk from "chalk";

export const getExecutablePath = (packageName: string, versionedPackageCachePath: string) => {
    const modulePath = resolve(versionedPackageCachePath, 'node_modules', packageName);
    const bin = readPackageJson(modulePath).bin;
    if (!bin) {
        console.log(chalk.red("[!] Error: no executable found"));
        process.exit(1);
    }
    const listOfKeys = Object.keys(bin);

    let executionJs = bin[packageName];
    if (!executionJs) {
        if (listOfKeys.length === 1) {
            executionJs = bin[listOfKeys[0]];
        } else {
            console.log(chalk.red(`[!] Error: no suitable found ${listOfKeys.map(v => chalk.white(v)).join(',')}`));
            process.exit(1);
        }
    }

    return resolve(modulePath, executionJs);
};
