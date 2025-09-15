import path from 'node:path';
import test from 'ava';
import {findUp, findDown, findDownSync} from '../index.js';
import {name, absolute, setupTemporaryDirectory} from './helpers.js';

setupTemporaryDirectory(test);

test('findDown async (depth 0 matches only cwd)', async t => {
	const p = await findDown(name.baz, {cwd: absolute.fixtureDirectory, depth: 0});
	t.is(p, absolute.baz);
});

test('findDown async (depth 0 does not find parent files)', async t => {
	const p = await findDown(name.baz, {cwd: absolute.barDir, depth: 0});
	t.is(p, undefined);
});

test('findDown async (prefers shallower match)', async t => {
	const p = await findDown(name.qux, {cwd: absolute.fixtureDirectory, depth: 2});
	t.is(p, absolute.qux);
});

test('findDown sync (finds nested child)', t => {
	const p = findDownSync(name.qux, {cwd: absolute.fooDir, depth: 2});
	t.is(p, absolute.barDirQux);
});

test('findDown async (respects array order)', async t => {
	const p = await findDown(['nope.js', name.qux], {cwd: absolute.fooDir, depth: 2});
	t.is(p, absolute.barDirQux);
});

test('findDown async (type: directory)', async t => {
	const p = await findDown(name.barDirectory, {cwd: absolute.fooDir, depth: 2, type: 'directory'});
	t.is(p, absolute.barDir);
});

test('findDown async (negative depth)', async t => {
	const p = await findDown(name.baz, {cwd: absolute.fixtureDirectory, depth: -1});
	t.is(p, absolute.baz);
});

test('findDown sync (negative depth)', t => {
	const p = findDownSync(name.baz, {cwd: absolute.fixtureDirectory, depth: -1});
	t.is(p, absolute.baz);
});

test('findDown async (not found)', async t => {
	const p = await findDown('nonexistent.js', {cwd: absolute.fixtureDirectory, depth: 3});
	t.is(p, undefined);
});

test('findDown sync (not found)', t => {
	const p = findDownSync('nonexistent.js', {cwd: absolute.fixtureDirectory, depth: 3});
	t.is(p, undefined);
});

test('findDown async (empty array)', async t => {
	const p = await findDown([], {cwd: absolute.fixtureDirectory, depth: 1});
	t.is(p, undefined);
});

test('findDown sync (empty array)', t => {
	const p = findDownSync([], {cwd: absolute.fixtureDirectory, depth: 1});
	t.is(p, undefined);
});

test('findDown async (non-existent directory)', async t => {
	const p = await findDown(name.baz, {cwd: '/nonexistent/directory', depth: 1});
	t.is(p, undefined);
});

test('findDown sync (non-existent directory)', t => {
	const p = findDownSync(name.baz, {cwd: '/nonexistent/directory', depth: 1});
	t.is(p, undefined);
});

test('findDown async (excessive depth)', async t => {
	const p = await findDown(name.qux, {cwd: absolute.fixtureDirectory, depth: 100});
	t.is(p, absolute.qux);
});

test('findDown sync (excessive depth)', t => {
	const p = findDownSync(name.qux, {cwd: absolute.fixtureDirectory, depth: 100});
	t.is(p, absolute.qux);
});

test('findDown async (zero depth with multiple targets)', async t => {
	const p = await findDown([name.qux, name.baz], {cwd: absolute.fixtureDirectory, depth: 0});
	t.is(p, absolute.qux);
});

test('findDown sync (zero depth with multiple targets)', t => {
	const p = findDownSync([name.qux, name.baz], {cwd: absolute.fixtureDirectory, depth: 0});
	t.is(p, absolute.qux);
});

test('integration: findUp matcher with findDown', async t => {
	const result = await findUp(directory => findDown(name.qux, {cwd: directory, depth: 2}), {cwd: absolute.fooDir});
	t.is(result, absolute.barDirQux);
});

// Strategy tests

test('findDown async (breadth-first strategy explicit)', async t => {
	const p = await findDown(name.qux, {cwd: absolute.fixtureDirectory, depth: 2, strategy: 'breadth'});
	t.is(p, absolute.qux);
});

test('findDown async (depth-first strategy)', async t => {
	const p = await findDown(name.qux, {cwd: absolute.fixtureDirectory, depth: 2, strategy: 'depth'});
	t.is(p, absolute.qux);
});

test('findDown sync (breadth-first strategy explicit)', t => {
	const p = findDownSync(name.qux, {cwd: absolute.fixtureDirectory, depth: 2, strategy: 'breadth'});
	t.is(p, absolute.qux);
});

test('findDown sync (depth-first strategy)', t => {
	const p = findDownSync(name.qux, {cwd: absolute.fixtureDirectory, depth: 2, strategy: 'depth'});
	t.is(p, absolute.qux);
});

test('findDown async (depth-first finds deep file when shallow missing)', async t => {
	const strategyTestDir = path.join(absolute.fixtureDirectory, 'strategy-test');

	// Should find the shallow file first with breadth-first
	const breadthResult = await findDown('shallow.txt', {cwd: strategyTestDir, depth: 3, strategy: 'breadth'});
	t.true(breadthResult.includes('shallow.txt'));

	// Should find files in depth-first order
	const depthResult = await findDown('deeper.txt', {cwd: strategyTestDir, depth: 3, strategy: 'depth'});
	t.true(depthResult.includes('deep/deeper.txt'));
});

test('findDown sync (depth-first finds deep file when shallow missing)', t => {
	const strategyTestDir = path.join(absolute.fixtureDirectory, 'strategy-test');

	// Should find the shallow file first with breadth-first
	const breadthResult = findDownSync('shallow.txt', {cwd: strategyTestDir, depth: 3, strategy: 'breadth'});
	t.true(breadthResult.includes('shallow.txt'));

	// Should find files in depth-first order
	const depthResult = findDownSync('deeper.txt', {cwd: strategyTestDir, depth: 3, strategy: 'depth'});
	t.true(depthResult.includes('deep/deeper.txt'));
});

test('findDown async (depth-first vs breadth-first ordering)', async t => {
	const strategyTestDir = path.join(absolute.fixtureDirectory, 'strategy-test');

	// Both should find deepest.txt, but might traverse differently
	const breadthResult = await findDown('deepest.txt', {cwd: strategyTestDir, depth: 3, strategy: 'breadth'});
	const depthResult = await findDown('deepest.txt', {cwd: strategyTestDir, depth: 3, strategy: 'depth'});

	t.true(breadthResult.includes('very-deep/deepest.txt'));
	t.true(depthResult.includes('very-deep/deepest.txt'));
});

test('findDown sync (depth-first vs breadth-first ordering)', t => {
	const strategyTestDir = path.join(absolute.fixtureDirectory, 'strategy-test');

	// Both should find deepest.txt, but might traverse differently
	const breadthResult = findDownSync('deepest.txt', {cwd: strategyTestDir, depth: 3, strategy: 'breadth'});
	const depthResult = findDownSync('deepest.txt', {cwd: strategyTestDir, depth: 3, strategy: 'depth'});

	t.true(breadthResult.includes('very-deep/deepest.txt'));
	t.true(depthResult.includes('very-deep/deepest.txt'));
});

test('findDown async (type: both - file)', async t => {
	const p = await findDown(name.qux, {cwd: absolute.fixtureDirectory, depth: 2, type: 'both'});
	t.is(p, absolute.qux);
});

test('findDown sync (type: both - file)', t => {
	const p = findDownSync(name.qux, {cwd: absolute.fixtureDirectory, depth: 2, type: 'both'});
	t.is(p, absolute.qux);
});

test('findDown async (type: both - directory)', async t => {
	const p = await findDown(name.barDirectory, {cwd: absolute.fooDir, depth: 1, type: 'both'});
	t.is(p, absolute.barDir);
});

test('findDown sync (type: both - directory)', t => {
	const p = findDownSync(name.barDirectory, {cwd: absolute.fooDir, depth: 1, type: 'both'});
	t.is(p, absolute.barDir);
});
