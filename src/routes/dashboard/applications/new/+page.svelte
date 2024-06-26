<script lang="ts">
	import Main from "@/components/Main.svelte";
	import Label from "@/components/ui/Label.svelte";
	import Select from "@/components/ui/Select.svelte";
	import type { PageData } from "./$types";
	import Button from "@/components/ui/Button.svelte";
	import { sendApplication, SendApplicationSchema } from "@/lib/api";
	import { goto } from "$app/navigation";

	export let data: PageData;

	let majorId: number | undefined = undefined;
	let eduLevelId: number | undefined = undefined;

	const submit = async () => {
		const body = SendApplicationSchema.parse({ majorId, eduLevelId });
		await sendApplication({ body, targetId: "@me" });
		goto("/dashboard");
	};
</script>

<Main>
	<div class="container flex max-w-screen-lg flex-1 flex-col justify-center gap-4">
		<form
			on:submit|preventDefault={submit}
			class="rounded-lg border border-border bg-background px-8 py-6"
		>
			<div>
				<h2 class="text-base font-semibold leading-7">Подача заявления</h2>
				<p class="mt-1 text-sm leading-6 text-muted-foreground">
					Выберите интересующее направление и подайте заявление
				</p>
			</div>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-6">
				<div class="w-full">
					<Label for="major" required>Направление</Label>
					<div class="mt-2">
						<Select bind:value={majorId} id="major" class="w-full" required>
							<option disabled selected value={undefined}>Не выбрано</option>
							{#if data.majors != null}
								{#each data.majors as major}
									<option value={major.id}>{major.name}</option>
								{/each}
							{/if}
						</Select>
					</div>
				</div>

				<div class="w-full">
					<Label for="base" required>На базе вашего уровня образования</Label>
					<div class="mt-2">
						<Select bind:value={eduLevelId} id="base" class="w-full" required>
							<option disabled selected value={undefined}>Не выбрано</option>
							{#if data.eduLevels != null}
								{#each data.eduLevels as level}
									<option value={level.id}>{level.displayValue ?? level.value}</option>
								{/each}
							{/if}
						</Select>
					</div>
				</div>
			</div>

			<div class="mb-2 mt-6">
				<Button type="submit" class="w-full">Отправить заявление</Button>
			</div>
		</form>
	</div>
</Main>
