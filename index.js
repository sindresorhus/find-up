import path from 'node:path';
import {locatePath, locatePathSync} from 'locate-path';
import {toPath} from 'unicorn-magic';
import {quansync} from 'quansync';

export const findUpStop = Symbol('findUpStop');

const locatePathQuansync = quansync({
	sync: (paths, options) => locatePathSync(paths, options),
	async: (paths, options) => locatePath(paths, options),
});

const findUpQuansync = quansync(function * (name, options = {}) {
	let directory = path.resolve(toPath(options.cwd) ?? '');
	const {root} = path.parse(directory);
	const stopAt = path.resolve(directory, toPath(options.stopAt) ?? root);
	const limit = options.limit ?? Number.POSITIVE_INFINITY;
	const paths = [name].flat();

	const runMatcher = function * (locateOptions) {
		if (typeof name !== 'function') {
			return yield * locatePathQuansync(paths, locateOptions);
		}

		const foundPathQuansync = quansync({
			sync: cwd => name(cwd),
			async: cwd => name(cwd),
		});
		const foundPath = yield * foundPathQuansync(locateOptions.cwd);
		if (typeof foundPath === 'string') {
			return yield * locatePathQuansync([foundPath], locateOptions);
		}

		return foundPath;
	};

	const matches = [];
	while (true) {
		const foundPath = yield * runMatcher({...options, cwd: directory});

		if (foundPath === findUpStop) {
			break;
		}

		if (foundPath) {
			matches.push(path.resolve(directory, foundPath));
		}

		if (directory === stopAt || matches.length >= limit) {
			break;
		}

		directory = path.dirname(directory);
	}

	return matches;
});

export async function findUpMultiple(name, options = {}) {
	const matches = await findUpQuansync(name, options);
	return matches;
}

export function findUpMultipleSync(name, options = {}) {
	const matches = findUpQuansync.sync(name, options);
	return matches;
}

export async function findUp(name, options = {}) {
	const matches = await findUpQuansync(name, {...options, limit: 1});
	return matches[0];
}

export function findUpSync(name, options = {}) {
	const matches = findUpQuansync.sync(name, {...options, limit: 1});
	return matches[0];
}

export {
	pathExists,
	pathExistsSync,
} from 'path-exists';
