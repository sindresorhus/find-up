'use strict';
var path = require('path');
var test = require('ava');
var fn = require('./');
var pkgPath = path.join(__dirname, 'package.json');

test('async', function (t) {
	return fn('package.json', {
		cwd: path.join(__dirname, 'fixture', 'foo', 'bar')
	}).then(function (fp) {
		t.is(fp, pkgPath);
	});
});

test('sync', function (t) {
	var fp = fn.sync('package.json', {
		cwd: path.join(__dirname, 'fixture', 'foo', 'bar')
	});

	t.is(fp, pkgPath);
	t.end();
});
