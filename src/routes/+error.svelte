<script lang="ts">
	import { page } from "$app/stores";
	import Main from "@/components/Main.svelte";

</script>

<Main class="p-4 flex flex-col items-center justify-center bg-background">
  <h2 class="font-black text-6xl">{$page.status}</h2>
  <p class="text-center text-muted-foreground">{$page.error?.message}</p>
</Main>
