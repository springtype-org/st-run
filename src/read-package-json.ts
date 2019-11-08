import {readFileSync} from "fs";
import {resolve} from "path";

export const readPackageJson = (modulePath: string): { name: string, bin: { [key: string]: string }, peerDependencies: { [key: string]: string } } => {
    return JSON.parse(readFileSync(resolve(modulePath, 'package.json')).toString());
};