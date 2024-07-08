<script lang="ts">
	import { invalidate } from "$app/navigation";
	import AppStatusBadge from "@/components/AppStatusBadge.svelte";
	import Button from "@/components/ui/Button.svelte";
	import type {
		getApplications,
		getCollegeMajors,
		getDictionaryAppStatuses,
		getDictionaryEduLevels,
	} from "@/lib/api";
	import { deleteUserApplication } from "@/lib/api/applications";
	import { DASHBOARD_HOME } from "@/lib/constants";

	export let application: Exclude<Awaited<ReturnType<typeof getApplications>>, null>[number];
	export let status: Exclude<Awaited<ReturnType<typeof getDictionaryAppStatuses>>, null>[number];
	export let eduLevel: Exclude<Awaited<ReturnType<typeof getDictionaryEduLevels>>, null>[number];
	export let major: Exclude<Awaited<ReturnType<typeof getCollegeMajors>>, null>[number];

	const dateFormatter = (d: Date): string => {
		const opt = { day: "2-digit", month: "2-digit", year: "numeric" } as const;
		return Intl.DateTimeFormat("ru", opt).format(d);
	};

	const selfDelete = async () => {
    // TODO: custom confirm window
    if (confirm("Вы действительно хотите удалить заявление?") !== true) {
      return
    }

		await deleteUserApplication({ targetUserId: "@me", applicationId: application.id });
		await invalidate(DASHBOARD_HOME);
	};
</script>

<div
	class="flex flex-col rounded-md border border-border bg-secondary px-2 py-3 text-secondary-foreground md:px-4 md:py-4"
>
	<div class="flex items-center gap-2">
		<div>
			<span class="hidden md:inline">Заявление на </span>
			<span class="font-semibold">{major?.prefix}</span>
			<span> от </span>
			<span class="font-semibold">{dateFormatter(new Date(application.createdAt))}</span>
		</div>
		<AppStatusBadge statusValue={status?.displayValue ?? status?.value ?? "Неизвестно"} />
		<div class="flex-1"></div>
		<Button onclick={selfDelete}>Удалить</Button>
	</div>

	<div class="mt-2 border-t border-border pt-2">
		<dl class="flex flex-col gap-1 md:flex-row">
			<dt>Направление:</dt>
			<dd class="font-semibold">{major?.name}</dd>
		</dl>
		<dl class="flex flex-col gap-1 md:flex-row">
			<dt>На базе:</dt>
			<dd class="font-semibold">{eduLevel?.displayValue ?? eduLevel?.value}</dd>
		</dl>
		<dl class="flex flex-col gap-1 md:flex-row">
			<dt>Приоритет:</dt>
			<dd class="font-semibold">{application.priority}</dd>
		</dl>
	</div>
</div>
