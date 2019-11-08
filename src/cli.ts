#!/usr/bin/env node

import chalk from "chalk";
import { execute } from "./execute";
import { installAndExecute } from "./install-and-execute";

(async () => {
  const args = process.argv.slice(2);

  const commands = [];
  let argsSplit = [...args];
  let indexToSplit;

  while ((indexToSplit = argsSplit.indexOf("++"))) {
    const command = argsSplit.slice(0, indexToSplit);
    argsSplit = argsSplit.slice(indexToSplit + 1);
    commands.push(command);

    if (indexToSplit === -1) {
      commands[commands.length - 1].push(argsSplit[argsSplit.length - 1]);
      break;
    }
  }
  try {
    // check for yarn and execute
    const currentYarnVersion = await execute(["yarn", "-v"]);
    console.log(chalk.green("- yarn version: ") + currentYarnVersion);
  } catch (e) {
    if (e.constructor === Error) {
      // install yarn globally
      try {
        console.log(chalk.cyan("- yarn missing, installing globally"));
        await execute(["npm", "install", "-g", "yarn"]);
      } catch (ex) {
        if (ex === "OFFLINE") {
          console.log(chalk.red("-> not able to install yarn, are you OFFLINE?"));
        } else {
          console.log(chalk.red("-> error installing yarn"));
        }
        process.exit(1);
      }
    }
  }

  for (const command of commands) {
    await installAndExecute(command[0], command.slice(1));
  }
})();
