import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import test from 'ava';
import isPathInside from 'is-path-inside';
import tempy from 'tempy';
import findUp from '.';

const name = {
	packageDirectory: 'find-up',
	packageJson: 'package.json',
	fixtureDirectory: 'fixture',
	modulesDirectory: 'node_modules',
	baz: 'baz.js',
	qux: 'qux.js'
};

// These paths are relative to the project root
const relative = {
	fixtureDirectory: name.fixtureDirectory,
	modulesDirectory: name.modulesDirectory
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

test('async (child directory)', async t => {
	const foundPath = await findUp(name.fixtureDirectory);

	t.is(foundPath, absolute.fixtureDirectory);
});

test('sync (child directory)', t => {
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

test('async (nested descendant directory)', async t => {
	const foundPath = await findUp(relative.barDir);

	t.is(foundPath, absolute.barDir);
});

test('sync (nested descendant directory)', t => {
	const foundPath = findUp.sync(relative.barDir);

	t.is(foundPath, absolute.barDir);
});

test('async (nested descendant directory, custom cwd)', async t => {
	const filePath = await findUp(relative.barDir, {
		cwd: relative.modulesDirectory
	});

	t.is(filePath, absolute.barDir);
});

test('sync (nested descendant directory, custom cwd)', t => {
	const filePath = findUp.sync(relative.barDir, {
		cwd: relative.modulesDirectory
	});

	t.is(filePath, absolute.barDir);
});

test('async (nested cousin directory, custom cwd)', async t => {
	const foundPath = await findUp(relative.barDir, {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.barDir);
});

test('sync (nested cousin directory, custom cwd)', t => {
	const foundPath = findUp.sync(relative.barDir, {
		cwd: relative.fixtureDirectory
	});

	t.is(foundPath, absolute.barDir);
});

test('async (ancestor directory, custom cwd)', async t => {
	const foundPath = await findUp(name.fixtureDirectory, {
		cwd: relative.barDir
	});

	t.is(foundPath, absolute.fixtureDirectory);
});

test('sync (ancestor directory, custom cwd)', t => {
	const foundPath = findUp.sync(name.fixtureDirectory, {
		cwd: relative.barDir
	});

	t.is(foundPath, absolute.fixtureDirectory);
});

test('async (absolute directory)', async t => {
	const filePath = await findUp(absolute.barDir);

	t.is(filePath, absolute.barDir);
});

test('sync (absolute directory)', t => {
	const filePath = findUp.sync(absolute.barDir);

	t.is(filePath, absolute.barDir);
});

test('async (not found, absolute file)', async t => {
	const filePath = await findUp(path.resolve('somenonexistentfile.js'));

	t.is(filePath, undefined);
});

test('sync (not found, absolute file)', t => {
	const filePath = findUp.sync(path.resolve('somenonexistentfile.js'));

	t.is(filePath, undefined);
});

test('async (absolute directory, disjoint cwd)', async t => {
	const filePath = await findUp(absolute.barDir, {
		cwd: t.context.disjoint
	});

	t.is(filePath, absolute.barDir);
});

test('sync (absolute directory, disjoint cwd)', t => {
	const filePath = findUp.sync(absolute.barDir, {
		cwd: t.context.disjoint
	});

	t.is(filePath, absolute.barDir);
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

test('async (matcher function)', async t => {
	const cwd = process.cwd();

	t.is(await findUp(directory => {
		t.is(directory, cwd);
		return directory;
	}), cwd);

	t.is(await findUp(() => {
		return '.';
	}), cwd);

	t.is(await findUp(async () => {
		return 'foo.txt';
	}), path.join(cwd, 'foo.txt'));

	t.is(await findUp(() => {
		return '..';
	}), path.join(cwd, '..'));

	t.is(await findUp(directory => {
		return (directory !== cwd) && directory;
	}), path.join(cwd, '..'));

	t.is(await findUp(directory => {
		return (directory !== cwd) && 'foo.txt';
	}), path.join(cwd, '..', 'foo.txt'));
});

test('async (not found, matcher function)', async t => {
	const cwd = process.cwd();
	const {root} = path.parse(cwd);
	const visited = new Set();
	t.is(await findUp(async directory => {
		t.is(typeof directory, 'string');
		const stat = await promisify(fs.stat)(directory);
		t.true(stat.isDirectory());
		t.true((directory === cwd) || isPathInside(cwd, directory));
		t.false(visited.has(directory));
		visited.add(directory);
	}), undefined);
	t.true(visited.has(cwd));
	t.true(visited.has(root));
});

test('async (matcher function throws)', async t => {
	const cwd = process.cwd();
	const visited = new Set();
	await t.throwsAsync(findUp(directory => {
		visited.add(directory);
		throw new Error('Some sync throw');
	}), {
		message: 'Some sync throw'
	});
	t.true(visited.has(cwd));
	t.is(visited.size, 1);
});

test('async (matcher function rejects)', async t => {
	const cwd = process.cwd();
	const visited = new Set();
	await t.throwsAsync(findUp(async directory => {
		visited.add(directory);
		throw new Error('Some async rejection');
	}), {
		message: 'Some async rejection'
	});
	t.true(visited.has(cwd));
	t.is(visited.size, 1);
});

test('async (matcher function stops early)', async t => {
	const cwd = process.cwd();
	const visited = new Set();
	t.is(await findUp(async directory => {
		visited.add(directory);
		return findUp.stop;
	}), undefined);
	t.true(visited.has(cwd));
	t.is(visited.size, 1);
});

test('sync (matcher function)', t => {
	const cwd = process.cwd();

	t.is(findUp.sync(directory => {
		t.is(directory, cwd);
		return directory;
	}), cwd);

	t.is(findUp.sync(() => {
		return '.';
	}), cwd);

	t.is(findUp.sync(() => {
		return 'foo.txt';
	}), path.join(cwd, 'foo.txt'));

	t.is(findUp.sync(() => {
		return '..';
	}), path.join(cwd, '..'));

	t.is(findUp.sync(directory => {
		return (directory !== cwd) && directory;
	}), path.join(cwd, '..'));

	t.is(findUp.sync(directory => {
		return (directory !== cwd) && 'foo.txt';
	}), path.join(cwd, '..', 'foo.txt'));
});

test('sync (not found, matcher function)', t => {
	const cwd = process.cwd();
	const {root} = path.parse(cwd);
	const visited = new Set();
	t.is(findUp.sync(directory => {
		t.is(typeof directory, 'string');
		const stat = fs.statSync(directory);
		t.true(stat.isDirectory());
		t.true((directory === cwd) || isPathInside(cwd, directory));
		t.false(visited.has(directory));
		visited.add(directory);
	}), undefined);
	t.true(visited.has(cwd));
	t.true(visited.has(root));
});

test('sync (matcher function throws)', t => {
	const cwd = process.cwd();
	const visited = new Set();
	t.throws(() => {
		findUp.sync(directory => {
			visited.add(directory);
			throw new Error('Some problem');
		});
	}, {
		message: 'Some problem'
	});
	t.true(visited.has(cwd));
	t.is(visited.size, 1);
});

test('sync (matcher function stops early)', t => {
	const cwd = process.cwd();
	const visited = new Set();
	t.is(findUp.sync(directory => {
		visited.add(directory);
		return findUp.stop;
	}), undefined);
	t.true(visited.has(cwd));
	t.is(visited.size, 1);
});
