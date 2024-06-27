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

	export let applications: Awaited<ReturnType<typeof getApplications>>;
	export let majors: Awaited<ReturnType<typeof getCollegeMajors>>;
	export let appStatuses: Awaited<ReturnType<typeof getDictionaryAppStatuses>>;
	export let eduLevels: Awaited<ReturnType<typeof getDictionaryEduLevels>>;

	const dateFormatter = (d: Date): string => {
		const opt = { day: "2-digit", month: "2-digit", year: "numeric" } as const;
		return Intl.DateTimeFormat("ru", opt).format(d);
	};

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

<div class="rounded-lg border border-border bg-background px-4 py-6 md:px-8 md:pb-8" id="applications">
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

				<div
					class="flex flex-col rounded-md border border-border bg-secondary px-2 py-3 text-secondary-foreground md:px-4 md:py-4"
				>
					<div class="flex items-center gap-2">
						<div>
							<span class="hidden md:inline">Заявление на </span>
							<span class="font-semibold">{major?.prefix}</span>
							<span> от </span>
							<span class="font-semibold">{dateFormatter(new Date(appl.createdAt))}</span>
						</div>
						<AppStatusBadge statusValue={status?.displayValue ?? status?.value ?? "Неизвестно"} />
					</div>

					<div class="mt-2 border-t border-border pt-2">
						<dl class="flex flex-col md:flex-row gap-1">
							<dt>Направление:</dt>
							<dd class="font-semibold">{major?.name}</dd>
						</dl>
						<dl class="flex flex-col md:flex-row gap-1">
							<dt>На базе:</dt>
							<dd class="font-semibold">{eduLevel?.displayValue ?? eduLevel?.value}</dd>
						</dl>
						<dl class="flex flex-col md:flex-row gap-1">
							<dt>Приоритет:</dt>
							<dd class="font-semibold">{appl.priority}</dd>
						</dl>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
