<script lang="ts">
	import { currentUser } from "@/stores/current-user";
</script>

{#if currentUser != null}
	<slot></slot>
{/if}
