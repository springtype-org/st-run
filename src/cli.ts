#!/usr/bin/env node
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

  // check for yarn and execute
  const yarnVersion = execute('npm', ['info', 'yarn', 'version']);

  // 'npm err' etc. if yarn is not installed
  if (yarnVersion.indexOf('npm') === 0) {

    // install yarn globally
    execute('npm', ['install', '-g', 'yarn']); 
  }

  for (const command of commands) {
    await installAndExecute(command[0], command.slice(1));
  }
})();
