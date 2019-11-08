import {resolve} from "path";
import {readPackageJson} from "./read-package-json";
import chalk from "chalk";
import {execute} from "./execute";

export const installPeerDependencies = async (packageName: string, installedPackagePath: string) => {
    const modulePath = resolve(installedPackagePath, 'node_modules', packageName);
    const peerDependencies = readPackageJson(modulePath).peerDependencies || {};
    for (const dependency of Object.keys(peerDependencies)) {
        console.log(chalk.cyan('[i] install peer dependency: ') + dependency);
        await execute(['npm', 'i', dependency, '--prefix', modulePath])
    }
};