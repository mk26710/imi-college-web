// See https://kit.svelte.dev/docs/types#app

import type { getCurrentUser } from "./lib/api";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			currentUser?: Awaited<ReturnType<typeof getCurrentUser>>
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
