# find-up [![Build Status](https://travis-ci.org/sindresorhus/find-up.svg?branch=master)](https://travis-ci.org/sindresorhus/find-up)

> Find a file or directory by walking up parent directories

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-find-up?utm_source=npm-find-up&utm_medium=referral&utm_campaign=readme">Get professional support for 'find-up' with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>

---

## Install

```
$ npm install find-up
```


## Usage

```
/
└── Users
		└── sindresorhus
				├── unicorn.png
				└── foo
						└── bar
								├── baz
								└── example.js
```

`example.js`

```js
const findUp = require('find-up');

(async () => {
	console.log(await findUp('unicorn.png'));
	//=> '/Users/sindresorhus/unicorn.png'

	console.log(await findUp(['rainbow.png', 'unicorn.png']));
	//=> '/Users/sindresorhus/unicorn.png'
})();
```


## API

### findUp(name, [options])

Returns a `Promise` for either the path or `undefined` if it couldn't be found.

### findUp([nameA, nameB], [options])

Returns a `Promise` for either the first path found (by respecting the order) or `undefined` if none could be found.

### findUp.sync(name, [options])

Returns a path or `undefined` if it couldn't be found.

### findUp.sync([nameA, nameB], [options])

Returns the first path found (by respecting the order) or `undefined` if none could be found.

#### name

Type: `string`

Name of the file or directory to find.

#### options

Type: `object`

##### cwd

Type: `string`<br>
Default: `process.cwd()`

Directory to start from.


## Security

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security). Tidelift will coordinate the fix and disclosure.


## Related

- [find-up-cli](https://github.com/sindresorhus/find-up-cli) - CLI for this module
- [pkg-up](https://github.com/sindresorhus/pkg-up) - Find the closest package.json file
- [pkg-dir](https://github.com/sindresorhus/pkg-dir) - Find the root directory of an npm package
- [resolve-from](https://github.com/sindresorhus/resolve-from) - Resolve the path of a module like `require.resolve()` but from a given path


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
