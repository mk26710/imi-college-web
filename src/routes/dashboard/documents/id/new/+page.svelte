<script lang="ts">
	import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.svelte";
	import Main from "@/components/Main.svelte";
	import Button from "@/components/ui/Button.svelte";
	import Select from "@/components/ui/Select.svelte";
	import type { EventHandler } from "svelte/elements";
	import type { PageData } from "./$types";
	import Label from "@/components/ui/Label.svelte";
	import Input from "@/components/ui/Input.svelte";
	import { compateNationalities } from "@/lib";

	export let data: PageData;

	let typeId: number | undefined;
	let series: string | undefined;
	let number: string | undefined;
	let issuer: string | undefined;
	let issuedAt: string | undefined;
	let divisionCode: string | undefined;
	let nationalityId: number | undefined;

	const submit: EventHandler<SubmitEvent, HTMLFormElement> = async () => {};
</script>

<Main>
	<div class="container flex max-w-screen-lg flex-1 flex-col gap-4">
		<div>
			<Button variant="outline" href="/dashboard/documents">
				<ChevronLeftIcon class="-mb-0.5" />
				<span>Назад</span>
			</Button>
		</div>

		<div class="rounded-lg border border-border bg-background px-4 py-6 md:px-8 md:pb-8">
			<div>
				<h2 class="text-base font-semibold leading-7">Удостоверения личности</h2>
				<p class="mt-1 text-sm leading-6 text-muted-foreground">
					Такие документы как паспорт, свидетельство о рождении, и т.п.
				</p>
			</div>

			<form
				class="mt-10 grid grid-flow-dense auto-rows-auto grid-cols-6 gap-4"
				on:submit|preventDefault={submit}
			>
				<div class="col-span-full flex flex-col gap-1.5">
					<Label for="doc-type-id" required>Тип документа</Label>
					<Select bind:value={typeId} id="doc-type-id" class="required w-full" required>
						<option selected disabled>Не выбрано</option>
						{#if data.idDocTypes != null}
							{#each data.idDocTypes as docType}
								<option value={docType.id}>{docType.displayValue ?? docType.value}</option>
							{/each}
						{/if}
					</Select>
				</div>

				<div class="col-span-1 flex flex-col gap-1.5">
					<Label for="series" required>Серия</Label>
					<Input bind:value={series} id="series" placeholder="32 41" required />
				</div>

				<div class="col-span-5 flex flex-col gap-1.5">
					<Label for="number" required>Номер</Label>
					<Input bind:value={number} id="number" placeholder="123 456" required />
				</div>

				<div class="col-span-full flex flex-col gap-1.5">
					<Label for="issuer" required>Кем выдан</Label>
					<Input bind:value={issuer} id="issuer" placeholder="МВД по г. Самара" required />
				</div>

				<div class="col-span-2 flex flex-col gap-1.5">
					<Label for="issued-at" required>Когда выдан</Label>
					<Input bind:value={issuedAt} id="issued-at" type="date" required />
				</div>

				<div class="col-span-2 flex flex-col gap-1.5">
					<Label for="division-code" required>Код подразделения</Label>
					<Input bind:value={divisionCode} id="division-code" placeholder="123-456" required />
				</div>

				<div class="col-span-2 flex flex-col gap-1.5">
					<Label for="nationality-id" required>Национальность</Label>
					<Select bind:value={nationalityId} id="nationality-id" class="w-full" required>
						<option disabled selected>Не выбрано</option>
						{#if data.nationalities != null}
							{@const nationalities = data.nationalities.toSorted(compateNationalities)}

							{#each nationalities as nationality}
								<option value={nationality.id}>
									{nationality.displayValue ?? nationality.value}
								</option>
							{/each}
						{/if}
					</Select>
				</div>
			</form>
		</div>
	</div>
</Main>
