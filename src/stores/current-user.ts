import { writable } from "svelte/store";

export const currentUser = writable<object | null>(null);

export const getCurrentUser = async () => {
	const res = await fetch("/api/users/@me", {
		method: "GET",
		credentials: "same-origin",
	});

	if (!res.ok) {
		if (res.status === 401) {
			currentUser.set(null);
		}
		return null;
	}

	const data = await res.json();
	currentUser.set(data);
	return data;
};

export const logoutCurrentUser = async () => {
	const res = await fetch("/api/tokens", {
		method: "DELETE",
		credentials: "same-origin",
	});

  if (res.ok) {
    currentUser.set(null);
  }

  return res.status;
};
