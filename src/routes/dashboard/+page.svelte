<script lang="ts">
	import Main from "@/components/Main.svelte";
	import Details from "./components/Details.svelte";
	import Address from "./components/Address.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Main>
	<div class="container max-w-screen-lg gap-4 flex flex-col">
		<Details />
		<Address address={data.address} />
	</div>
</Main>
