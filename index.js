'use strict';
const path = require('path');
const fs = require('fs');
const locatePath = require('locate-path');

const stop = Symbol('findUp.stop');

const exists = path => {
	if (typeof path !== 'string') {
		throw new TypeError('Expected a string');
	}

	return fs.existsSync(path);
};

const stats = path => fs.statSync(path);

const isFile = path => exists(path) ? stats(path).isFile() : false;

const isDirectory = path => exists(path) ? stats(path).isDirectory() : false;

module.exports = async (name, options = {}) => {
	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);
	// eslint-disable-next-line no-constant-condition
	while (true) {
		// eslint-disable-next-line no-await-in-loop
		const foundPath = await (typeof name === 'function' ? name(directory) : locatePath(paths, {cwd: directory}));

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
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
		const foundPath = typeof name === 'function' ? name(directory) : locatePath.sync(paths, {cwd: directory});

		if (foundPath === stop) {
			return;
		}

		if (foundPath) {
			return path.resolve(directory, foundPath);
		}

		if (directory === root) {
			return;
		}

		directory = path.dirname(directory);
	}
};

module.exports.exists = exists;

module.exports.isFile = isFile;

module.exports.isDirectory = isDirectory;

module.exports.stop = stop;
