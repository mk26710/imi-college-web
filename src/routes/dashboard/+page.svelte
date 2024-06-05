<script lang="ts">
	import Main from "@/components/Main.svelte";
	import Details from "./components/Details.svelte";
	import Address from "./components/Address.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Main>
	<div class="container flex max-w-screen-lg flex-col gap-4">
		<Details currentUser={data.currentUser} />
		<Address address={data.address} />
	</div>
</Main>
