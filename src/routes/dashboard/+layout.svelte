<script lang="ts">
	import Unauthorized from "@/components/errors/Unauthorized.svelte";
	import { currentUser } from "@/stores/current-user";
</script>

{#if $currentUser != null}
	<slot></slot>
{:else}
	<Unauthorized />
{/if}
