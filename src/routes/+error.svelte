<script lang="ts">
	import { page } from "$app/stores";
	import Main from "@/components/Main.svelte";
</script>

<Main class="flex flex-col items-center justify-center p-4">
	<h2 class="text-6xl font-black">{$page.status}</h2>
	<p class="text-center text-muted-foreground">{$page.error?.message}</p>
</Main>
