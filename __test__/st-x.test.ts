import {invalidatePackageCachePath, installAndExecute} from '../src';

describe("executes a fresh copy of st-cp", () => {

    it('install and execute st-cp', async () => {

        invalidatePackageCachePath('st-cp');

        await installAndExecute('st-cp', []);
    });
});
