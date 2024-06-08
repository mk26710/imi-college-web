<script lang="ts">
	import Main from "@/components/Main.svelte";
	import Label from "$ui/Label.svelte";
	import Select from "$ui/Select.svelte";
	import Button from "$ui/Button.svelte";
	import { page } from "$app/stores";
	import Input from "@/components/ui/Input.svelte";
	import type { PageData } from "./$types";
	import { SetCurrentUserDetailsBodySchema, setCurrentUserDetails } from "@/lib/api";
	import { goto, invalidateAll } from "$app/navigation";

	export let data: PageData;

	let firstName: string | undefined = $page.data.currentUser?.details?.firstName;
	let middleName: string | undefined = $page.data.currentUser?.details?.middleName;
	let lastName: string | undefined = $page.data.currentUser?.details?.lastName ?? undefined;
	let genderId: number | undefined = $page.data.currentUser?.details?.genderId;
	let birthday: string | undefined = $page.data.currentUser?.details?.birthday?.split("T")?.at(0);
	let tel: string | undefined = $page.data.currentUser?.details?.tel;
	let snils: string | undefined = $page.data.currentUser?.details?.snils ?? undefined;
	let needsDorm: boolean = $page.data.currentUser?.details?.needsDorm ?? false;

	const handleSubmit = async () => {
		const parsed = SetCurrentUserDetailsBodySchema.safeParse({
			firstName,
			middleName,
			lastName,
			genderId,
			tel,
			snils,
			needsDorm,
			birthday: birthday?.includes("T") ? birthday : `${birthday}T00:00:00Z`,
		});

		if (parsed.success === false) {
			console.error(parsed.error.format());
			return;
		}

		await setCurrentUserDetails({ body: parsed.data });
		await invalidateAll();

		goto("/dashboard#details");
	};
</script>

<Main class="flex flex-col justify-center p-4">
	<form
		on:submit|preventDefault={handleSubmit}
		class="w-full max-w-screen-md rounded-lg border border-border bg-background p-6"
	>
		<div class="space-y-12">
			<div class="border-b border-border pb-10">
				<h2 class="text-base font-semibold leading-7">Персональные данные</h2>
				<p class="mt-1 text-sm leading-6 text-muted-foreground">Укажите информация о себе</p>

				<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
					<div class="space-y-2 sm:col-span-2">
						<Label for="firstName" required>Имя</Label>
						<Input bind:value={firstName} id="firstName" class="w-full" minlength={2} required />
					</div>
					<div class="space-y-2 sm:col-span-2">
						<Label for="middleName" required>Фамилия</Label>
						<Input bind:value={middleName} id="middleName" class="w-full" minlength={2} required />
					</div>
					<div class="space-y-2 sm:col-span-2">
						<Label for="lastName">Отчество</Label>
						<Input bind:value={lastName} id="lastName" class="w-full" />
					</div>
					<div class="space-y-2 sm:col-span-2">
						<Label required>Пол</Label>
						<Select bind:value={genderId} class="w-full" required>
							<option disabled selected value="-1">Не выбран</option>
							{#if data.dictGenders != null}
								{#each data.dictGenders as gender}
									<option value={gender.id}>{gender.displayValue || gender.value}</option>
								{/each}
							{/if}
						</Select>
					</div>
					<div class="space-y-2 sm:col-span-2">
						<Label required>Дата рождения</Label>
						<Input bind:value={birthday} type="date" required />
					</div>
					<div class="space-y-2 sm:col-span-2">
						<Label required>Телефон</Label>
						<Input bind:value={tel} type="tel" required />
					</div>
					<div class="space-y-2 sm:col-span-full">
						<Label required>СНИЛС</Label>
						<Input bind:value={snils} required />
					</div>
					<div class="sm:col-span-full">
						<Label class="flex items-center gap-2">
							<input
								bind:checked={needsDorm}
								type="checkbox"
								class="form-checkbox h-4 w-4 rounded-sm text-primary focus:ring-primary"
							/>
							<span>Требуется общежитие</span>
						</Label>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-end gap-x-4">
			<Button href="/dashboard#details" type="button" variant="ghost">Отмена</Button>
			<Button type="submit">Сохранить</Button>
		</div>
	</form>
</Main>
