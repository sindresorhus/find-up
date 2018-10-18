export interface IOptions {
	/** Directory to start from. */
	cwd: string;
}

/**
 * Returns a `Promise` for either the filepath or `null` if it couldn't be found.
 * @param filename Filename of the file to find.
 */
export default function (filename: string, opts?: IOptions): Promise<string | null>;
/**
 * Returns a `Promise` for either the first filepath found (by respecting the order) or `null` if none could be found.
 * @param filename Filename of the file to find.
 */
export default function (filename: string[], opts?: IOptions): Promise<string | null>;
