'use strict';
const path = require('path');
const locatePath = require('locate-path');
const pathType = require('path-type');
const pathExists = require('path-exists');

const stop = Symbol('findUp.stop');

const isSymlink = path => {
	if (typeof path !== 'string') {
		throw new TypeError('Expected a string');
	}

	return pathType.isSymlink(path);
};

const exists = async path => {
	if (typeof path !== 'string') {
		throw new TypeError('Expected a string');
	}

	const symlink = await isSymlink(path);
	return symlink || pathExists(path);
};

const isFile = async path => await exists(path) ? pathType.isFile(path) : false;

const isDirectory = async path => await exists(path) ? pathType.isDirectory(path) : false;

const isSymlinkSync = path => {
	if (typeof path !== 'string') {
		throw new TypeError('Expected a string');
	}

	return pathType.isSymlinkSync(path);
};

const existsSync = path => {
	if (typeof path !== 'string') {
		throw new TypeError('Expected a string');
	}

	return isSymlinkSync(path) || pathExists.sync(path);
};

const isFileSync = path => existsSync(path) ? pathType.isFileSync(path) : false;

const isDirectorySync = path => existsSync(path) ? pathType.isDirectorySync(path) : false;

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

module.exports.isSymlink = isSymlink;

module.exports.sync.exists = existsSync;

module.exports.sync.isFile = isFileSync;

module.exports.sync.isDirectory = isDirectorySync;

module.exports.sync.isSymlink = isSymlinkSync;

module.exports.stop = stop;
