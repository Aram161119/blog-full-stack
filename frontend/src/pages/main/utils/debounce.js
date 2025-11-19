export const debounce = (fn, delay = 1000) => {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId);
		setTimeout(fn, delay, ...args);
	};
};
