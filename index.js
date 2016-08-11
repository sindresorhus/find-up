'use strict';
var path = require('path');
var pathExists = require('path-exists');
var Promise = require('pinkie-promise');

function rootDir(dir) {
	var sepIndex = dir.indexOf(path.sep);
	return sepIndex >= 0 ? dir.substring(0, sepIndex + 1) : dir;
}

module.exports = function (filename, opts) {
	opts = opts || {};

	var dir = path.resolve(opts.cwd || '');
	var root = rootDir(dir);

	return new Promise(function (resolve) {
		(function find() {
			var fp = path.join(dir, filename);
			pathExists(fp).then(function (exists) {
				if (exists) {
					resolve(fp);
				} else if (dir === root) {
					resolve(null);
				} else {
					dir = path.dirname(dir);
					find();
				}
			});
		})();
	});
};

module.exports.sync = function (filename, opts) {
	opts = opts || {};

	var dir = path.resolve(opts.cwd || '');
	var root = rootDir(dir);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		var fp = path.join(dir, filename);

		if (pathExists.sync(fp)) {
			return fp;
		} else if (dir === root) {
			return null;
		}

		dir = path.dirname(dir);
	}
};
