'use strict';
const path = require('path');
const pathExists = require('path-exists');

module.exports = (filename, opts) => {
	opts = opts || {};

	const startDir = path.resolve(opts.cwd || '');
	const root = path.parse(startDir).root;

	return new Promise(resolve => {
		(function find(dir) {
			const fp = path.join(dir, filename);

			pathExists(fp).then(exists => {
				if (exists) {
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

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const fp = path.join(dir, filename);

		if (pathExists.sync(fp)) {
			return fp;
		} else if (dir === root) {
			return null;
		}

		dir = path.dirname(dir);
	}
};
