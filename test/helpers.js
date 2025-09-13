import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {temporaryDirectory} from 'tempy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDirectory = path.dirname(__dirname);

export const name = {
	packageDirectory: 'find-up',
	packageJson: 'package.json',
	fixtureDirectory: 'fixture',
	fooDirectory: 'foo',
	barDirectory: 'bar',
	modulesDirectory: 'node_modules',
	baz: 'baz.js',
	qux: 'qux.js',
	fileLink: 'file-link',
	directoryLink: 'directory-link',
	dotDirectory: '.git',
};

// These paths are relative to the project root
export const relative = {
	fixtureDirectory: name.fixtureDirectory,
	modulesDirectory: name.modulesDirectory,
};
relative.baz = path.join(relative.fixtureDirectory, name.baz);
relative.qux = path.join(relative.fixtureDirectory, name.qux);
relative.barDirQux = path.join(relative.fixtureDirectory, name.fooDirectory, name.barDirectory, name.qux);
relative.barDir = path.join(relative.fixtureDirectory, name.fooDirectory, name.barDirectory);

export const absolute = {
	packageDirectory,
};
absolute.packageJson = path.join(absolute.packageDirectory, name.packageJson);
absolute.fixtureDirectory = path.join(
	absolute.packageDirectory,
	name.fixtureDirectory,
);
absolute.baz = path.join(absolute.fixtureDirectory, name.baz);
absolute.qux = path.join(absolute.fixtureDirectory, name.qux);
absolute.fooDir = path.join(absolute.fixtureDirectory, name.fooDirectory);
absolute.barDir = path.join(absolute.fixtureDirectory, name.fooDirectory, name.barDirectory);
absolute.barDirQux = path.join(absolute.fixtureDirectory, name.fooDirectory, name.barDirectory, name.qux);
absolute.fileLink = path.join(absolute.fixtureDirectory, name.fileLink);
absolute.directoryLink = path.join(absolute.fixtureDirectory, name.directoryLink);
absolute.dotDirectory = path.join(packageDirectory, name.dotDirectory);

export const url = {
	fixtureDirectory: pathToFileURL(absolute.fixtureDirectory),
};

export const isWindows = process.platform === 'win32';

export function setupTemporaryDirectory(test) {
	test.beforeEach(t => {
		t.context.disjoint = temporaryDirectory();
	});

	test.afterEach(t => {
		fs.rmdirSync(t.context.disjoint);
	});
}
