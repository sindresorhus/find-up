export interface IOptions {
	/** Directory to start from. */
	cwd: string;
}

/**
 * Returns a `Promise` for either the filepath or `null` if it couldn't be found.
 *
 * @param filename Filename of the file to find.
 */
declare function findUp(
	filename: string,
	options?: IOptions,
): Promise<string | null>;
/**
 * Returns a `Promise` for either the first filepath found (by respecting the order) or `null` if none could be found.
 *
 * @param filename Filename of the file to find.
 */
declare function findUp(
	filename: string[],
	options?: IOptions,
): Promise<string | null>;

declare namespace findUp {
	/**
	 * Returns a filepath or null.
	 *
	 * @param filename Filename of the file to find.
	 */
	function sync(filename: string, options?: IOptions): string | null;
	/**
	 * Returns the first filepath found (by respecting the order) or null.
	 *
	 * @param filename Filename of the file to find.
	 */
	function sync(filename: string[], options?: IOptions): string | null;
}

export default findUp;
