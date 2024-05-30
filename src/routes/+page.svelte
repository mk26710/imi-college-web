<script lang="ts">
	import { currentUser } from "@/stores/current-user";
</script>

<svelte:head>
	<title>Приём заявлений</title>
</svelte:head>

<p>{JSON.stringify($currentUser, null, 2)}</p>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
