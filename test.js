import fs from 'fs';
import path from 'path';
import test from 'ava';
import tempfile from 'tempfile';
import fn from './';

const name = {
	pkgDir: 'find-up',
	pkg: 'package.json',
	fixtureDir: 'fixture',
	baz: 'baz.js',
	qux: 'qux.js'
};

// These paths are relative to the project root
const rel = {
	fixtureDir: name.fixtureDir
};
rel.baz = path.join(rel.fixtureDir, name.baz);
rel.qux = path.join(rel.fixtureDir, name.qux);
rel.barDir = path.join(rel.fixtureDir, 'foo', 'bar');

const abs = {
	pkgDir: __dirname
};
abs.pkg = path.join(abs.pkgDir, name.pkg);
abs.fixtureDir = path.join(abs.pkgDir, name.fixtureDir);
abs.baz = path.join(abs.fixtureDir, name.baz);
abs.qux = path.join(abs.fixtureDir, name.qux);
abs.barDir = path.join(abs.fixtureDir, 'foo', 'bar');

// Create a disjoint directory, used for the not-found tests
test.beforeEach(t => {
	const tmpDir = tempfile();
	fs.mkdirSync(tmpDir);
	t.context.disjoint = tmpDir;
});

test.afterEach(t => {
	fs.rmdirSync(t.context.disjoint);
});

test('async (child file)', async t => {
	const filePath = await fn(name.pkg);

	t.is(filePath, abs.pkg);
});

test('sync (child file)', t => {
	const filePath = fn.sync(name.pkg);

	t.is(filePath, abs.pkg);
});

test('async (child dir)', async t => {
	const filePath = await fn(name.fixtureDir);

	t.is(filePath, abs.fixtureDir);
});

test('sync (child dir)', t => {
	const filePath = fn.sync(name.fixtureDir);

	t.is(filePath, abs.fixtureDir);
});

test('async (child file, custom cwd)', async t => {
	const filePath = await fn(name.baz, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('sync (child file, custom cwd)', t => {
	const filePath = fn.sync(name.baz, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('async (child file, array, custom cwd)', async t => {
	const filePath = await fn([name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('sync (child file, array, custom cwd)', t => {
	const filePath = fn.sync([name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('async (first child file, array, custom cwd)', async t => {
	const filePath = await fn([name.qux, name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.qux);
});

test('sync (first child file, array, custom cwd)', t => {
	const filePath = fn.sync([name.qux, name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.qux);
});

test('async (second child file, array, custom cwd)', async t => {
	const filePath = await fn(['fake', name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('sync (second child file, array, custom cwd)', t => {
	const filePath = fn.sync(['fake', name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('async (cwd)', async t => {
	const filePath = await fn(name.pkgDir, {
		cwd: abs.pkgDir
	});

	t.is(filePath, abs.pkgDir);
});

test('sync (cwd)', t => {
	const filePath = fn.sync(name.pkgDir, {
		cwd: abs.pkgDir
	});

	t.is(filePath, abs.pkgDir);
});

test('async (cousin file, custom cwd)', async t => {
	const filePath = await fn(name.baz, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.baz);
});

test('sync (cousin file, custom cwd)', t => {
	const filePath = fn.sync(name.baz, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.baz);
});

test('async (nested descendant file)', async t => {
	const filePath = await fn(rel.baz);

	t.is(filePath, abs.baz);
});

test('sync (nested descendant file)', t => {
	const filePath = fn.sync(rel.baz);

	t.is(filePath, abs.baz);
});

test('async (nested descendant dir)', async t => {
	const filePath = await fn(rel.barDir);

	t.is(filePath, abs.barDir);
});

test('sync (nested descendant dir)', t => {
	const filePath = fn.sync(rel.barDir);

	t.is(filePath, abs.barDir);
});

test('async (nested cousin dir, custom cwd)', async t => {
	const filePath = await fn(rel.barDir, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.barDir);
});

test('sync (nested cousin dir, custom cwd)', t => {
	const filePath = fn.sync(rel.barDir, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.barDir);
});

test('async (ancestor dir, custom cwd)', async t => {
	const filePath = await fn(name.fixtureDir, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.fixtureDir);
});

test('sync (ancestor dir, custom cwd)', t => {
	const filePath = fn.sync(name.fixtureDir, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.fixtureDir);
});

test('async (not found)', async t => {
	const filePath = await fn('somenonexistentfile.js');

	t.is(filePath, null);
});

test('sync (not found)', t => {
	const filePath = fn.sync('somenonexistentfile.js');

	t.is(filePath, null);
});

// Both tests start in a disjoint directory. `package.json` should not be found
// and `null` should be returned.
test('async (not found, custom cwd)', async t => {
	const filePath = await fn(name.pkg, {
		cwd: t.context.disjoint
	});

	t.is(filePath, null);
});

test('sync (not found, custom cwd)', t => {
	const filePath = fn.sync(name.pkg, {
		cwd: t.context.disjoint
	});

	t.is(filePath, null);
});
