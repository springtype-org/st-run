import { execute } from "./execute";

export const fetchLatestPackageVersion = (packageName: string) => {
  return execute("npm", ["show", packageName, "version"]).trim();
};
