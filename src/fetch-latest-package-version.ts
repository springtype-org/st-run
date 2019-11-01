import { execute } from "./execute";

export const fetchLatestPackageVersion = (packageName: string) => {
  return execute("yarn", ["info", packageName, "version"]).trim();
};
