<script lang="ts">
	import Unauthorized from "@/components/errors/Unauthorized.svelte";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
</script>

{#if data.currentUser != null}
	<slot></slot>
{:else}
	<Unauthorized />
{/if}
