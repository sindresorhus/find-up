import { expectType } from 'tsd-check';
import findUp from '.';

(async () => {
	let path = await findUp('package.json');
	if (typeof path === 'string') {
		expectType<string>(path);
	} else {
		expectType<null>(path);
	}
	path = await findUp('package.json', { cwd: './' });
	if (typeof path === 'string') {
		expectType<string>(path);
	} else {
		expectType<null>(path);
	}

	path = findUp.sync('package.json');
	if (typeof path === 'string') {
		expectType<string>(path);
	} else {
		expectType<null>(path);
	}
	path = findUp.sync('package.json', { cwd: './' });
	if (typeof path === 'string') {
		expectType<string>(path);
	} else {
		expectType<null>(path);
	}
})();
