import path from 'node:path';
import {locatePath, locatePathSync} from 'locate-path';

export const findUpStop = Symbol('findUpStop');

export async function findUp(name, options = {}) {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const stopAt = options.stopAt || root;
	const paths = [name].flat();

	const runMatcher = async locateOptions => {
		if (typeof name !== 'function') {
			return locatePath(paths, locateOptions);
		}

		const foundPath = await name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePath([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await runMatcher({...options, cwd: directory});

		if (foundPath === findUpStop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === stopAt) {
			return;
		}

		directory = path.dirname(directory);
	}
}

export function findUpSync(name, options = {}) {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const stopAt = options.stopAt || root;
	const paths = [name].flat();

	const runMatcher = locateOptions => {
		if (typeof name !== 'function') {
			return locatePathSync(paths, locateOptions);
		}

		const foundPath = name(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return locatePathSync([foundPath], locateOptions);
		}

		return foundPath;
	};

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const foundPath = runMatcher({...options, cwd: directory});

		if (foundPath === findUpStop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === stopAt) {
			return;
		}

		directory = path.dirname(directory);
	}
}

export {
	pathExists,
	pathExistsSync,
} from 'path-exists';
