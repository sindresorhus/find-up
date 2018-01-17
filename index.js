'use strict';
const path = require('path');
const locatePath = require('locate-path');

function isLastDirEqualTo(dir, compareDir) {
	if (!compareDir) {
		return false;
	}

	const splittedPath = dir.split('/');
	const lastFolder = splittedPath[splittedPath.length - 1];

	if (lastFolder === compareDir) {
		return true;
	}

	return false;
}

module.exports = (filename, opts) => {
	opts = opts || {};

	const startDir = path.resolve(opts.cwd || '');
	const root = path.parse(startDir).root;
	const filenames = [].concat(filename);

	return new Promise(resolve => {
		(function find(dir) {
			locatePath(filenames, {cwd: dir}).then(file => {
				if (file) {
					resolve(path.join(dir, file));
				} else if (isLastDirEqualTo(dir, opts.stopDir)) {
					resolve(null);
				} else if (dir === root) {
					resolve(null);
				} else {
					find(path.dirname(dir));
				}
			});
		})(startDir);
	});
};

module.exports.sync = (filename, opts) => {
	opts = opts || {};

	let dir = path.resolve(opts.cwd || '');
	const root = path.parse(dir).root;

	const filenames = [].concat(filename);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const file = locatePath.sync(filenames, {cwd: dir});

		if (file) {
			return path.join(dir, file);
		} else if (isLastDirEqualTo(dir, opts.stopDir)) {
			return null;
		} else if (dir === root) {
			return null;
		}

		dir = path.dirname(dir);
	}
};
