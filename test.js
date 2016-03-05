import test from 'ava';
import fs from 'fs';
import path from 'path';
import tempdir from 'tempdir';
import fn from './';

const pkgPath = path.resolve('.', 'package.json');
const bazPath = path.resolve('.', 'fixture', 'baz.js');
const fixture = path.join('.', 'fixture', 'foo', 'bar');

// Create a disjoint directory, used for the not-found tests.
test.beforeEach(async t => {
	t.context.disjoint = await tempdir();
});

test.afterEach(t => {
	fs.rmdirSync(t.context.disjoint);
});

test('async (dir)', async t => {
	const filePath = await fn('package.json', {
		cwd: fixture
	});

	t.is(filePath, pkgPath);
});

test('sync (dir)', t => {
	const fp = fn.sync('package.json', {
		cwd: fixture
	});

	t.is(fp, pkgPath);
});

test('async (file)', async t => {
	const filePath = await fn(bazPath);

	t.is(filePath, bazPath);
});

test('sync (file)', t => {
	const filePath = fn.sync(bazPath);

	t.is(filePath, bazPath);
});

// Both tests start in a disjoint directory. `package.json` should not be found
// and `null` should be returned.
test('async (not found)', async t => {
	const fp = await fn('package.json', {
		cwd: t.context.disjoint
	});

	t.is(fp, null);
});

test('sync (not found)', t => {
	const fp = fn.sync('package.json', {
		cwd: t.context.disjoint
	});

	t.is(fp, null);
});
