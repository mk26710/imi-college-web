import type { DictRegion } from "./api-types";

export const getPreferredScheme = () => {
	return window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches ? "dark" : "light";
};

export const compareRegions = (a: DictRegion, b: DictRegion): number => {
	let diff = b.sortPriority - a.sortPriority;

	if (diff === 0) {
		diff = (a.displayValue || a.value).localeCompare(b.displayValue || b.value);
	}

	return diff;
};
