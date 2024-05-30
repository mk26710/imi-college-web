<script lang="ts">
	import Header from "@/components/Header.svelte";
	import { getCurrentUser } from "@/stores/current-user";
	import { fade } from "svelte/transition";
	import "@/css/inter.css";
	import "@/css/main.css";

	// export let data: LayoutData;

	// const user = writable();
	// $: user.set(data?.user);

	// $: {
	// 	console.log(data);
	// }

	// setContext("user", user);

	let promise = getCurrentUser();
</script>

{#await promise}
	<div
		transition:fade={{ delay: 250, duration: 300 }}
		class="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-primary"
	>
		<h3 class="text-center text-6xl font-bold text-primary-foreground">
			Колледж &laquo;МИР&raquo;
		</h3>
	</div>
{:then value}
	<Header></Header>
	<slot />
{/await}
