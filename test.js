import test from 'ava';
import path from 'path';
import fn from './';

const pkgPath = path.resolve('.', 'package.json');

test('async', async t => {
	const filePath = await fn('package.json', {
		cwd: path.join('.', 'fixture', 'foo', 'bar')
	});

	t.is(filePath, pkgPath);
});

test('sync', t => {
	const fp = fn.sync('package.json', {
		cwd: path.join('.', 'fixture', 'foo', 'bar')
	});

	t.is(fp, pkgPath);
});
