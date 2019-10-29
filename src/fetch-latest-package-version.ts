import { execute } from "./execute";

export const fetchLastestPackageVersion = (packageName: string) => {
  return execute("npm", ["show", packageName, "version"]).trim();
};
