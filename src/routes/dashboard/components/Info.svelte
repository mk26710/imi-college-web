<script lang="ts">
	import type { getCurrentUser } from "@/lib/api";

	export let user: Awaited<ReturnType<typeof getCurrentUser>> = null;

	$: createdAtDate = new Date(user?.createdAt ?? "1900-01-01");
	$: createdAtLocal = Intl.DateTimeFormat("ru", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(createdAtDate);

	$: entries = [
		{ title: "Логин", value: user?.username },
		{ title: "Почта", value: user?.email },
		{ title: "Дата регистрации", value: createdAtLocal },
	];
</script>

<div id="info" class="rounded-lg border border-border bg-background px-8 py-6">
	<div class="flex flex-row items-start px-4 sm:px-0">
		<div class="flex-1">
			<h3 class="text-base font-semibold leading-7 text-primary">Общие сведения</h3>
			<p class="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">Информация об аккаунте</p>
		</div>
		<!-- <a
			href="/dashboard/address/edit"
			role="button"
			class="flex items-center justify-center gap-2 opacity-50 hover:opacity-100"
		>
			<PenIcon />
			<span class="text-sm">Редактировать</span>
		</a> -->
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
