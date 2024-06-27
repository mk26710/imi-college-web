<script lang="ts">
	import Main from "@/components/Main.svelte";
	import type { PageData } from "./$types";
	import Info from "./components/Info.svelte";
	import PinRightIcon from "$icons/PinRightIcon.svelte";
	import Applications from "./components/Applications.svelte";
	import Button from "@/components/ui/Button.svelte";

	export let data: PageData;

	let blocks = [
		{ title: "Персональные данные", href: "/dashboard/details/edit" },
		{ title: "Домашний адрес", href: "/dashboard/address/edit" },
		{ title: "Документы", href: "#" },
	];
</script>

<svelte:head>
	<title>Личный кабинет абитуриента</title>
</svelte:head>

<Main>
	<div class="container flex max-w-screen-lg flex-col gap-4">
		<Info user={data.currentUser} />
		<div
			class="grid grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 md:grid-rows-1 lg:grid-cols-3"
		>
			{#each blocks as block}
				<Button href={block.href} class="h-auto py-3">
					<div class="flex-1">
						<h2 class="truncate font-semibold leading-7">{block.title}</h2>
					</div>
					<PinRightIcon class="h-5 min-h-5 w-5 min-w-5" />
				</Button>
			{/each}
		</div>
		<Applications
			applications={data.applications}
			majors={data.majors}
			appStatuses={data.appStatuses}
			eduLevels={data.eduLevels}
		/>
	</div>
</Main>
