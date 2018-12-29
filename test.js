import fs from 'fs';
import path from 'path';
import test from 'ava';
import isPathInside from 'is-path-inside';
import pify from 'pify';
import tempy from 'tempy';
import m from '.';

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
	const tmpDir = tempy.directory();
	t.context.disjoint = tmpDir;
});

test.afterEach(t => {
	fs.rmdirSync(t.context.disjoint);
});

test('async (child file)', async t => {
	const filePath = await m(name.pkg);

	t.is(filePath, abs.pkg);
});

test('sync (child file)', t => {
	const filePath = m.sync(name.pkg);

	t.is(filePath, abs.pkg);
});

test('async (child dir)', async t => {
	const filePath = await m(name.fixtureDir);

	t.is(filePath, abs.fixtureDir);
});

test('sync (child dir)', t => {
	const filePath = m.sync(name.fixtureDir);

	t.is(filePath, abs.fixtureDir);
});

test('async (child file, custom cwd)', async t => {
	const filePath = await m(name.baz, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('sync (child file, custom cwd)', t => {
	const filePath = m.sync(name.baz, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('async (child file, array, custom cwd)', async t => {
	const filePath = await m([name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('sync (child file, array, custom cwd)', t => {
	const filePath = m.sync([name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('async (first child file, array, custom cwd)', async t => {
	const filePath = await m([name.qux, name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.qux);
});

test('sync (first child file, array, custom cwd)', t => {
	const filePath = m.sync([name.qux, name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.qux);
});

test('async (second child file, array, custom cwd)', async t => {
	const filePath = await m(['fake', name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('sync (second child file, array, custom cwd)', t => {
	const filePath = m.sync(['fake', name.baz], {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.baz);
});

test('async (cwd)', async t => {
	const filePath = await m(name.pkgDir, {
		cwd: abs.pkgDir
	});

	t.is(filePath, abs.pkgDir);
});

test('sync (cwd)', t => {
	const filePath = m.sync(name.pkgDir, {
		cwd: abs.pkgDir
	});

	t.is(filePath, abs.pkgDir);
});

test('async (cousin file, custom cwd)', async t => {
	const filePath = await m(name.baz, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.baz);
});

test('sync (cousin file, custom cwd)', t => {
	const filePath = m.sync(name.baz, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.baz);
});

test('async (nested descendant file)', async t => {
	const filePath = await m(rel.baz);

	t.is(filePath, abs.baz);
});

test('sync (nested descendant file)', t => {
	const filePath = m.sync(rel.baz);

	t.is(filePath, abs.baz);
});

test('async (nested descendant dir)', async t => {
	const filePath = await m(rel.barDir);

	t.is(filePath, abs.barDir);
});

test('sync (nested descendant dir)', t => {
	const filePath = m.sync(rel.barDir);

	t.is(filePath, abs.barDir);
});

test('async (nested cousin dir, custom cwd)', async t => {
	const filePath = await m(rel.barDir, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.barDir);
});

test('sync (nested cousin dir, custom cwd)', t => {
	const filePath = m.sync(rel.barDir, {
		cwd: rel.fixtureDir
	});

	t.is(filePath, abs.barDir);
});

test('async (ancestor dir, custom cwd)', async t => {
	const filePath = await m(name.fixtureDir, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.fixtureDir);
});

test('sync (ancestor dir, custom cwd)', t => {
	const filePath = m.sync(name.fixtureDir, {
		cwd: rel.barDir
	});

	t.is(filePath, abs.fixtureDir);
});

test('async (not found)', async t => {
	const filePath = await m('somenonexistentfile.js');

	t.is(filePath, null);
});

test('sync (not found)', t => {
	const filePath = m.sync('somenonexistentfile.js');

	t.is(filePath, null);
});

// Both tests start in a disjoint directory. `package.json` should not be found
// and `null` should be returned.
test('async (not found, custom cwd)', async t => {
	const filePath = await m(name.pkg, {
		cwd: t.context.disjoint
	});

	t.is(filePath, null);
});

test('sync (not found, custom cwd)', t => {
	const filePath = m.sync(name.pkg, {
		cwd: t.context.disjoint
	});

	t.is(filePath, null);
});

test('async (matcher function)', async t => {
	const cwd = process.cwd();

	t.is(await m(dir => {
		t.is(dir, cwd);
		return dir;
	}), cwd);

	t.is(await m(() => {
		return '.';
	}), cwd);

	t.is(await m(async () => {
		return 'foo.txt';
	}), path.join(cwd, 'foo.txt'));

	t.is(await m(() => {
		return '..';
	}), path.join(cwd, '..'));

	t.is(await m(dir => {
		return (dir !== cwd) && dir;
	}), path.join(cwd, '..'));

	t.is(await m(dir => {
		return (dir !== cwd) && 'foo.txt';
	}), path.join(cwd, '..', 'foo.txt'));
});

test('async (not found, matcher function)', async t => {
	const cwd = process.cwd();
	const {root} = path.parse(cwd);
	const visited = new Set();
	t.is(await m(async dir => {
		t.is(typeof dir, 'string');
		const stat = await pify(fs.stat)(dir);
		t.true(stat.isDirectory());
		t.true((dir === cwd) || isPathInside(cwd, dir));
		t.false(visited.has(dir));
		visited.add(dir);
	}), null);
	t.true(visited.has(cwd));
	t.true(visited.has(root));
});

test('sync (matcher function)', t => {
	const cwd = process.cwd();

	t.is(m.sync(dir => {
		t.is(dir, cwd);
		return dir;
	}), cwd);

	t.is(m.sync(() => {
		return '.';
	}), cwd);

	t.is(m.sync(() => {
		return 'foo.txt';
	}), path.join(cwd, 'foo.txt'));

	t.is(m.sync(() => {
		return '..';
	}), path.join(cwd, '..'));

	t.is(m.sync(dir => {
		return (dir !== cwd) && dir;
	}), path.join(cwd, '..'));

	t.is(m.sync(dir => {
		return (dir !== cwd) && 'foo.txt';
	}), path.join(cwd, '..', 'foo.txt'));
});

test('sync (not found, matcher function)', t => {
	const cwd = process.cwd();
	const {root} = path.parse(cwd);
	const visited = new Set();
	t.is(m.sync(dir => {
		t.is(typeof dir, 'string');
		const stat = fs.statSync(dir);
		t.true(stat.isDirectory());
		t.true((dir === cwd) || isPathInside(cwd, dir));
		t.false(visited.has(dir));
		visited.add(dir);
	}), null);
	t.true(visited.has(cwd));
	t.true(visited.has(root));
});
