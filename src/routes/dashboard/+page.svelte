<script lang="ts">
	import Main from "@/components/Main.svelte";
	import Details from "./components/Details.svelte";
	import Address from "./components/Address.svelte";
	import type { PageData } from "./$types";
	import Info from "./components/Info.svelte";

	export let data: PageData;
</script>

<Main>
	<div class="container flex max-w-screen-lg flex-col gap-4">
		<Info user={data.currentUser} />
		<Details currentUser={data.currentUser} dictGenders={data.dictGenders} />
		<Address address={data.address} />
	</div>
</Main>
