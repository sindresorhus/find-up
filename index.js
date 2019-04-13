'use strict';
const path = require('path');
const locatePath = require('locate-path');

module.exports = (filename, options = {}) => {
	const startDirectory = path.resolve(options.cwd || '');
	const {root} = path.parse(startDirectory);

	const filenames = [].concat(filename);

	return new Promise(resolve => {
		(function find(directory) {
			locatePath(filenames, {cwd: directory}).then(file => {
				if (file) {
					resolve(path.join(directory, file));
				} else if (directory === root) {
					resolve(null);
				} else {
					find(path.dirname(directory));
				}
			});
		})(startDirectory);
	});
};

module.exports.sync = (filename, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);

	const filenames = [].concat(filename);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const file = locatePath.sync(filenames, {cwd: directory});

		if (file) {
			return path.join(directory, file);
		}

		if (directory === root) {
			return null;
		}

		directory = path.dirname(directory);
	}
};
