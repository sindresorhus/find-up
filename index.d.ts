declare module 'find-up' {
    export interface FindUpOptions {
        readonly cwd?: string
    }

    /**
     * Finds the file and then returns it its path
     *
     * @param filename Of the path to be find
     * @param options Contains the directory to start from
     * @returns The filepath
     */
    export function sync(filename: string | string[], options?: FindUpOptions): string | null;

    /**
     * Finds the file and then returns it its path
     *
     * @param filename Of the path to be find
     * @param options Contains the directory to start from
     * @returns The filepath
     */
    export default function findUp(filename: string | string[], options?: FindUpOptions): Promise<string | null>;
}
