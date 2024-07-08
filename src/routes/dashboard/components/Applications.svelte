<script lang="ts">
	import AppStatusBadge from "@/components/AppStatusBadge.svelte";
	import PlusIcon from "@/components/icons/PlusIcon.svelte";
	import Button from "@/components/ui/Button.svelte";
	import type {
		getApplications,
		getCollegeMajors,
		getDictionaryAppStatuses,
		getDictionaryEduLevels,
	} from "@/lib/api";
	import Application from "./Application.svelte";

	export let applications: Awaited<ReturnType<typeof getApplications>>;
	export let majors: Awaited<ReturnType<typeof getCollegeMajors>>;
	export let appStatuses: Awaited<ReturnType<typeof getDictionaryAppStatuses>>;
	export let eduLevels: Awaited<ReturnType<typeof getDictionaryEduLevels>>;

	const majorById = (id: string) => {
		return majors?.find((m) => m.id === id);
	};

	const statusById = (id: number) => {
		return appStatuses?.find((s) => s.id === id);
	};

	const eduLevelById = (id: number) => {
		return eduLevels?.find((el) => el.id === id);
	};
</script>

<div
	class="rounded-lg border border-border bg-background px-4 py-6 md:px-8 md:pb-8"
	id="applications"
>
	<div class="flex flex-row items-start px-4 sm:px-0">
		<div class="flex-1">
			<h3 class="text-base font-semibold leading-7 text-primary">Мои заявления</h3>
			<p class="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
				Подача заявлений на обучение
			</p>
		</div>
		<div>
			<Button href="/dashboard/applications/new" class="flex items-center">
				<PlusIcon class="mr-2 h-4 w-4" />
				<span>Подать Заявление</span>
			</Button>
		</div>
	</div>

	<div class="mt-6 flex flex-col gap-3 border-t border-border pt-6">
		{#if applications != null}
			{#each applications as appl}
				{@const major = majorById(appl.majorId)}
				{@const status = statusById(appl.statusId)}
				{@const eduLevel = eduLevelById(appl.eduLevelId)}

				{#if major != null && status != null && eduLevel != null}
					<Application application={appl} {eduLevel} {status} {major} />
				{:else}
					<div>Ошибка загрузки данных</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>
