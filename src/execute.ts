import chalk from "chalk";
import { exec as childExec, ExecException, ExecOptions, execSync, ExecSyncOptions } from "child_process";
import { platform } from "os";
import { osPath } from "./os-path";

/**
 * Promisify the node exec method
 */
const exec = (command: string, options: { encoding: BufferEncoding } & ExecOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    childExec(command, options, (error: ExecException | null, stdout: string, stderr: string) => {
      if (error) {
        // npm no internet
        if (error.message.indexOf("This is a problem related to network connectivity.") > 0) {
          reject("OFFLINE");
        } else {
          reject(error);
        }
      } else if (stderr) {
        if (stderr.indexOf("offline") > 0) {
          reject("OFFLINE");
        } else {
          reject(stderr);
        }
      } else {
        resolve(stdout);
      }
    });
  });
};

/**
 * the native exec method for windows and linux
 */
export const execute = async (commands: Array<string>, options: { encoding: BufferEncoding } & ExecOptions = { encoding: "utf8" }) => {
  const unionCommands = commands.join(" ");
  console.log(chalk.green(">") + " " + chalk.white(unionCommands));
  const isWindows = platform() === "win32";
  if (isWindows) {
    return await exec(`${osPath.resolve(process.env.comspec)} /c ${unionCommands}`, options);
  } else {
    return await exec(unionCommands, options);
  }
};

/**
 * the sync execute method, this also wait for user input
 */
export const executeSync = (commands: Array<string>, options: ExecSyncOptions = {}) => {
  const unionCommands = commands.join(" ");
  console.log(chalk.green(">") + " " + chalk.white(unionCommands));

  let result;
  if (platform() === "win32") {
    result = execSync(`${osPath.resolve(process.env.comspec)} /c ${unionCommands}`, options);
  } else {
    result = execSync(unionCommands, options);
  }

  if (!options.stdio || (options.stdio !== "inherit" && options.stdio !== "ignore")) {
    return result.toString("utf8");
  }
  return null;
};
