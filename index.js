'use strict';
const path = require('path');
const locatePath = require('locate-path');

module.exports = async (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await locatePath(paths, {cwd: directory});

		if (foundPath) {
			return path.join(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
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
