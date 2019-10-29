import { invalidatePackageCachePath } from "../dist/invalidate-package-cache";
import { installAndExecute } from './../dist/install-and-execute';

describe("executes a fresh copy of st-cp", () => {

	it('install and execute st-cp', async() => {

		invalidatePackageCachePath('st-cp');
		
		installAndExecute('st-cp');
	});
});
