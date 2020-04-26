
const chalk = require("chalk");
import { execute } from "./execute";

export const fetchLatestPackageVersion = async (packageName: string) => {
  try {
    return (await execute(["npm", "info", packageName, "version"])).trim();
  } catch (e) {
    console.log(chalk.red("-> unknown node package ") + chalk.white(packageName));
    process.exit(1);
  }
};
