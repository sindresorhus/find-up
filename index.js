'use strict';
const path = require('path');
const locatePath = require('locate-path');
const pathExists = require('path-exists');
const smartCoro = require('./smart-coro');

const stop = Symbol('findUp.stop');

const runMatcher = smartCoro(function * (locateOptions) {
	const {locate, name, paths, async} = this;
	if (typeof name !== 'function') {
		return locate(paths, locateOptions);
	}

	const result = name(locateOptions.cwd);
	const foundPath = async ? yield result : result;
	if (typeof foundPath === 'string') {
		return locate([foundPath], locateOptions);
	}

	return foundPath;
});

const findUp = smartCoro(function * (name, options) {
	const {async, locate} = this;
	// SmartCoro will switch to the async state machine if the wrapped function
	// yields a promise
	if (async) {
		yield Promise.resolve();
	}

	let directory = path.resolve(options.cwd || '');
	const {root} = path.parse(directory);
	const paths = [].concat(name);

	while (true) {
		const result = runMatcher.call(
			{locate, name, paths, async},
			{...options, cwd: directory}
		);
		const foundPath = async ? yield result : result;

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
});

module.exports = Object.assign(
	(name, options = {}) => findUp.call({
		async: true,
		locate: locatePath
	}, name, options),
	{
		exists: pathExists,
		stop
	}
);

module.exports.sync = Object.assign(
	(name, options = {}) => findUp.call({
		async: false,
		locate: locatePath.sync
	}, name, options),
	{
		exists: pathExists.sync
	}
);
