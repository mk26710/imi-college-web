import { browser } from "$app/environment";
import { getPreferredScheme } from "@/lib";
import { writable } from "svelte/store";

const STORAGE_KEY = "color-scheme";

export type AppTheme = "dark" | "light";

export const appTheme = writable<AppTheme>(getInitialState());

export const setDarkTheme = () => {
	appTheme.set("dark");
};

export const setLightTheme = () => {
	appTheme.set("light");
};

function getInitialState(): AppTheme {
	if (!browser) {
		return "light";
	}

	const value = localStorage.getItem(STORAGE_KEY);
	if (value !== "light" && value !== "dark") {
		return getPreferredScheme(); 
	}

	return value;
};

appTheme.subscribe((value) => {
	if (browser) {
		localStorage.setItem(STORAGE_KEY, value);
	
		if (value === "dark") {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark")
		}
	}
});
