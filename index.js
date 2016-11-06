'use strict';
const path = require('path');
const pathExists = require('path-exists');

const verifyIfPathFound = paths => new Promise(resolve => {
	const nextPath = paths.next();

	if (nextPath.done) {
		return resolve();
	}

	return resolve(nextPath.value[1].then(exists => {
		if (exists) {
			return nextPath.value[0];
		}

		return verifyIfPathFound(paths);
	}));
});

const searchPath = (dir, files) => files.map(file => {
	const fp = path.join(dir, file);

	return [fp, pathExists(fp)];
});

const findPath = (dir, files) => verifyIfPathFound(
	searchPath(dir, files)[Symbol.iterator]()
);

module.exports = (filename, opts) => {
	opts = opts || {};

	const startDir = path.resolve(opts.cwd || '');
	const root = path.parse(startDir).root;

	const filenames = [].concat(filename);

	return new Promise(resolve => {
		(function find(dir) {
			findPath(dir, filenames).then(fp => {
				if (fp) {
					resolve(fp);
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

	const findPathSync = files => files
		.map(name => path.join(dir, name))
		.find(filePath => pathExists.sync(filePath));

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const fp = findPathSync(filenames);

		if (fp) {
			return fp;
		} else if (dir === root) {
			return null;
		}

		dir = path.dirname(dir);
	}
};
