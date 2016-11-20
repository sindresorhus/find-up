'use strict';
const path = require('path');
const locatePath = require('locate-path');

const findPath = (dir, files) => locatePath(files.map(file => path.join(dir, file)), {concurrency: 1});

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

	const findPathSync = (directory, files) => locatePath.sync(files.map(name => path.join(directory, name)));

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const fp = findPathSync(dir, filenames);

		if (fp) {
			return fp;
		} else if (dir === root) {
			return null;
		}

		dir = path.dirname(dir);
	}
};
