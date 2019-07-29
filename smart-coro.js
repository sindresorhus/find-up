'use strict';

// eslint-disable-next-line promise/prefer-await-to-then
const isPromise = obj => obj && typeof obj.then === 'function';

/**
 * @param {Generator} it Generator object to continue using
 * @param {Promise} promise Promise object that caused the switch to async
 * @return {Promise} Promise of the state machine
 */
const withAsync = async (it, promise) => {
	let step = promise;
	let state = 2;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		/* eslint-disable no-fallthrough */
		switch (state) {
			default: {
				const current = it.next(step);
				step = current.value;

				if (current.done) {
					return step;
				}
			}

			case 1:
				if (!isPromise(step)) {
					state = 0;
					continue;
				}

			case 2:
				// eslint-disable-next-line no-await-in-loop
				step = await step;
				state = 1;
		}
		/* eslint-enable no-fallthrough */
	}
};

/**
 * Wrap a generator function in a state machine that transitions from sync to
 * async execution only when a promises is yielded.
 *
 * @param {GeneratorFunction} gen Generator function to be wrapped
 * @return {function(...*): *} Wrapped function
 */
module.exports = gen => function (...args) {
	/** @type {Generator} */
	const it = gen.apply(this, args);
	let step;
	// eslint-disable-next-line no-constant-condition
	while (true) {
		const current = it.next(step);
		step = current.value;

		if (current.done) {
			break;
		}

		if (isPromise(step)) {
			return withAsync(it, step);
		}
	}

	return step;
};
