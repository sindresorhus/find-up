import test from 'ava';
import path from 'path';
import fn from './';

const pkgPath = path.resolve('.', 'package.json');
const bazPath = path.resolve('.', 'fixture', 'baz.js');
const fixture = path.join('.', 'fixture', 'foo', 'bar');

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
