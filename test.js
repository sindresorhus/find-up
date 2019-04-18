import fs from 'fs';
import path from 'path';
import test from 'ava';
import tempy from 'tempy';
import findUp from '.';

const name = {
	packageDirectory: 'find-up',
	packageJson: 'package.json',
	fixtureDirectory: 'fixture',
	baz: 'baz.js',
	qux: 'qux.js'
};

// These paths are relative to the project root
const relative = {
	fixtureDirectory: name.fixtureDirectory
};
relative.baz = path.join(relative.fixtureDirectory, name.baz);
relative.qux = path.join(relative.fixtureDirectory, name.qux);
relative.barDir = path.join(relative.fixtureDirectory, 'foo', 'bar');

const absolute = {
	packageDirectory: __dirname
};
absolute.packageJson = path.join(absolute.packageDirectory, name.packageJson);
absolute.fixtureDirectory = path.join(
	absolute.packageDirectory,
	name.fixtureDirectory
);
absolute.baz = path.join(absolute.fixtureDirectory, name.baz);
absolute.qux = path.join(absolute.fixtureDirectory, name.qux);
absolute.barDir = path.join(absolute.fixtureDirectory, 'foo', 'bar');

// Create a disjoint directory, used for the not-found tests
test.beforeEach(t => {
	const tmpDir = tempy.directory();
	t.context.disjoint = tmpDir;
});

test.afterEach(t => {
	fs.rmdirSync(t.context.disjoint);
});

test('async (child file)', async t => {
	const foundPath = await findUp(name.packageJson);

	t.is(foundPath, absolute.packageJson);
});

test('sync (child file)', t => {
	const foundPath = findUp.sync(name.packageJson);

	t.is(foundPath, absolute.packageJson);
});

test('async (child dir)', async t => {
	const foundPath = await findUp(name.fixtureDirectory);

	t.is(foundPath, absolute.fixtureDirectory);
});

test('sync (child dir)', t => {
	const foundPath = findUp.sync(name.fixtureDirectory);

	t.is(foundPath, absolute.fixtureDirectory);
});

test('async (child file, custom cwd)', async t => {
	const foundPath = await findUp(name.baz, {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.baz);
});

test('sync (child file, custom cwd)', t => {
	const foundPath = findUp.sync(name.baz, {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.baz);
});

test('async (child file, array, custom cwd)', async t => {
	const foundPath = await findUp([name.baz], {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.baz);
});

test('sync (child file, array, custom cwd)', t => {
	const foundPath = findUp.sync([name.baz], {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.baz);
});

test('async (first child file, array, custom cwd)', async t => {
	const foundPath = await findUp([name.qux, name.baz], {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.qux);
});

test('sync (first child file, array, custom cwd)', t => {
	const foundPath = findUp.sync([name.qux, name.baz], {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.qux);
});

test('async (second child file, array, custom cwd)', async t => {
	const foundPath = await findUp(['fake', name.baz], {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.baz);
});

test('sync (second child file, array, custom cwd)', t => {
	const foundPath = findUp.sync(['fake', name.baz], {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.baz);
});

test('async (cwd)', async t => {
	const foundPath = await findUp(name.packageDirectory, {
		cwd: absolute.packageDirectory
	});

	t.is(foundPath, absolute.packageDirectory);
});

test('sync (cwd)', t => {
	const foundPath = findUp.sync(name.packageDirectory, {
		cwd: absolute.packageDirectory
	});

	t.is(foundPath, absolute.packageDirectory);
});

test('async (cousin file, custom cwd)', async t => {
	const foundPath = await findUp(name.baz, {
		cwd: relative.barDir
	});

	t.is(foundPath, absolute.baz);
});

test('sync (cousin file, custom cwd)', t => {
	const foundPath = findUp.sync(name.baz, {
		cwd: relative.barDir
	});

	t.is(foundPath, absolute.baz);
});

test('async (nested descendant file)', async t => {
	const foundPath = await findUp(relative.baz);

	t.is(foundPath, absolute.baz);
});

test('sync (nested descendant file)', t => {
	const foundPath = findUp.sync(relative.baz);

	t.is(foundPath, absolute.baz);
});

test('async (nested descendant dir)', async t => {
	const foundPath = await findUp(relative.barDir);

	t.is(foundPath, absolute.barDir);
});

test('sync (nested descendant dir)', t => {
	const foundPath = findUp.sync(relative.barDir);

	t.is(foundPath, absolute.barDir);
});

test('async (nested cousin dir, custom cwd)', async t => {
	const foundPath = await findUp(relative.barDir, {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.barDir);
});

test('sync (nested cousin dir, custom cwd)', t => {
	const foundPath = findUp.sync(relative.barDir, {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.barDir);
});

test('async (ancestor dir, custom cwd)', async t => {
	const foundPath = await findUp(name.fixtureDirectory, {
		cwd: relative.barDir
	});

	t.is(foundPath, absolute.fixtureDirectory);
});

test('sync (ancestor dir, custom cwd)', t => {
	const foundPath = findUp.sync(name.fixtureDirectory, {
		cwd: relative.barDir
	});

	t.is(foundPath, absolute.fixtureDirectory);
});

test('async (not found)', async t => {
	const foundPath = await findUp('somenonexistentfile.js');

	t.is(foundPath, undefined);
});

test('sync (not found)', t => {
	const foundPath = findUp.sync('somenonexistentfile.js');

	t.is(foundPath, undefined);
});

// Both tests start in a disjoint directory. `package.json` should not be found
// and `undefined` should be returned.
test('async (not found, custom cwd)', async t => {
	const foundPath = await findUp(name.packageJson, {
		cwd: t.context.disjoint
	});

	t.is(foundPath, undefined);
});

test('sync (not found, custom cwd)', t => {
	const foundPath = findUp.sync(name.packageJson, {
		cwd: t.context.disjoint
	});

	t.is(foundPath, undefined);
});
