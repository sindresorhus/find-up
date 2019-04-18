declare namespace findUp {
	interface Options {
		/**
		Directory to start from.

		@default process.cwd()
		*/
		readonly cwd?: string;
	}
}

declare const findUp: {
	/**
	Find a file or directory by walking up parent directories.

	@param name - Name of the file or directory to find. Can be multiple.
	@returns The first path found (by respecting the order of `name`s) or `undefined` if none could be found.

	@example
	```
	// /
	// └── Users
	// 		└── sindresorhus
	// 				├── unicorn.png
	// 				└── foo
	// 						└── bar
	// 								├── baz
	// 								└── example.js

	// example.js
	import findUp = require('find-up');

	(async () => {
		console.log(await findUp('unicorn.png'));
		//=> '/Users/sindresorhus/unicorn.png'

		console.log(await findUp(['rainbow.png', 'unicorn.png']));
		//=> '/Users/sindresorhus/unicorn.png'
	})();
	```
	*/
	(name: string | string[], options?: findUp.Options): Promise<string | undefined>;

	/**
	Synchronously find a file or directory by walking up parent directories.

	@param name - Name of the file or directory to find. Can be multiple.
	@returns The first path found (by respecting the order of `names`s) or `undefined` if none could be found.
	*/
	sync(name: string | string[], options?: findUp.Options): string | undefined;
};

export = findUp;
