import { execute } from "./execute";

export const fetchLatestPackageVersion = (packageName: string) => {
  return execute("npm", ["info", packageName, "version"]).trim();
};
