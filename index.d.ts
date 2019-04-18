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

	@param filename - Filename of the file or an array of files to find.
	@returns Either the first filepath found (by respecting the order of `filename`s) or `null`.

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
	(filename: string | string[], options?: findUp.Options): Promise<
		string | null
	>;

	/**
	Synchronously find a file or directory by walking up parent directories.

	@param filename - Filename of the file or an array of files to find.
	@returns Either the first filepath found (by respecting the order of `filename`s) or `null`.
	*/
	sync(filename: string | string[], options?: findUp.Options): string | null;
};

export = findUp;
