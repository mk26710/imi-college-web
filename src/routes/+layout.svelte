<script lang="ts">
	import type { LayoutData } from "./$types";
	import { setContext } from "svelte";
	import { readonly, writable } from "svelte/store";
	import Header from "@/components/Header.svelte";
	import Footer from "@/components/Footer.svelte";
	import "@/css/inter.css";
	import "@/css/main.css";

	export let data: LayoutData;

	const currentUser = writable(data.currentUser);
	$: {
		currentUser.set(data.currentUser);
	}

	setContext("currentUser", readonly(currentUser));
</script>

<Header currentUser={data.currentUser} />
<slot />
<Footer />
