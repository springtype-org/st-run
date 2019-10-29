#!/usr/bin/env node

import { installAndExecute } from "./install-and-execute";

(async () => {
  const args = process.argv.slice(2);

  let commands = [];
  let argsSplit = [...args];
  let indexToSplit;

  while ((indexToSplit = argsSplit.indexOf("+"))) {

    let command = argsSplit.slice(0, indexToSplit);
    argsSplit = argsSplit.slice(indexToSplit + 1);
    commands.push(command);

    if (indexToSplit === -1) {
      commands[commands.length - 1].push(argsSplit[argsSplit.length - 1]);
      break;
    }
  }

  for (let i = 0; i < commands.length; i++) {
    await installAndExecute(commands[i][0], commands[i].slice(1));
  }
})();
