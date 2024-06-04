<script lang="ts">
	import PenIcon from "@/components/icons/PenIcon.svelte";
	import type { UserAddress } from "@/lib/api-types";

	export let address: UserAddress | undefined | null = undefined;

	$: entries = [
		{
			title: "Регион",
			value: address?.region?.displayValue ?? address?.region?.value,
		},
		{
			title: "Тип населённого пункта",
			value: address?.townType?.displayValue ?? address?.townType?.value,
		},
		{
			title: "Населённый пункт",
			value: address?.town,
		},
		{
			title: "Адрес",
			value: address?.address,
		},
		{
			title: "Почтовый индекс",
			value: address?.postCode,
		},
	];
</script>

<div class="rounded-lg border border-border bg-background px-8 py-6" id="address">
	<div class="px-4 sm:px-0 flex flex-row items-start">
		<div class="flex-1">
			<h3 class="text-base font-semibold leading-7 text-primary">Адрес абитуриента</h3>
			<p class="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">Место жительства</p>
		</div>
		<a
			href="/dashboard/address/edit"
			role="button"
			class="flex items-center justify-center gap-2 opacity-50 hover:opacity-100"
		>
			<PenIcon />
			<span class="text-sm">Редактировать</span>
		</a>
	</div>
	<div class="mt-6 border-t border-border">
		<dl class="divide-y divide-border">
			{#each entries as entry}
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-primary">{entry.title}</dt>
					<dd class="mt-1 text-sm leading-6 text-primary/80 sm:col-span-2 sm:mt-0">
						{entry.value}
					</dd>
				</div>
			{/each}
		</dl>
	</div>
</div>
