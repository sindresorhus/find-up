'use strict';
const path = require('path');
const locatePath = require('locate-path');

module.exports = (name, options = {}) => {
	const startDirectory = path.resolve(options.cwd || '');
	const {root} = path.parse(startDirectory);

	const paths = [].concat(name);

	return new Promise(resolve => {
		(function find(directory) {
			locatePath(paths, {cwd: directory}).then(foundPath => {
				if (foundPath) {
					resolve(path.join(directory, foundPath));
				} else if (directory === root) {
					resolve();
				} else {
					find(path.dirname(directory));
				}
			});
		})(startDirectory);
	});
};

module.exports.sync = (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);

	const paths = [].concat(name);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const foundPath = locatePath.sync(paths, {cwd: directory});

		if (foundPath) {
			return path.join(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};
