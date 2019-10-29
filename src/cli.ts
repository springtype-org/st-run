#!/usr/bin/env node

import { installAndExecute } from './install-and-execute';

(async () => {
    const packageName = process.argv[2];
    const args = process.argv.slice(3);

    await installAndExecute(packageName, args);
})();
