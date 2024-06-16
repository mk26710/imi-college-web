<script lang="ts">
	import PenIcon from "@/components/icons/PenIcon.svelte";
	import type { getCurrentUser, getDictionaryGenders } from "@/lib/api";

	export let currentUser: Awaited<ReturnType<typeof getCurrentUser>>;
	export let dictGenders: Awaited<ReturnType<typeof getDictionaryGenders>>;

	$: fullName =
		currentUser?.details?.middleName +
		" " +
		currentUser?.details?.firstName +
		" " +
		currentUser?.details?.lastName;

	$: birthDate = new Date(currentUser?.details?.birthday || "1900-01-01");
	$: intlBirthDate = Intl.DateTimeFormat("ru", {
		year: "numeric",
		day: "numeric",
		month: "short",
	}).format(birthDate);

	$: gender = dictGenders?.find((entry) => entry.id === currentUser?.details?.genderId);
	$: genderReadable = gender?.displayValue ?? gender?.value ?? "Неизвестно";

	type Entry = { title: string; name?: string; value: unknown; editable?: boolean };

	$: entries = [
		{ title: "Полное имя", value: fullName },
		{ title: "Пол", value: genderReadable },
		{ title: "Дата рождения", value: intlBirthDate },
		{ title: "Телефон", value: currentUser?.details?.tel },
		{ title: "СНИЛС", value: currentUser?.details?.snils ?? "Не указан" },
		{ title: "Требуется общежитие", value: currentUser?.details?.needsDorm ? "Да" : "Нет" },
	] satisfies Entry[];
</script>

<div class="rounded-lg border border-border bg-background px-8 py-6">
	<div class="px-4 sm:px-0">
		<h3 class="flex items-center text-base font-semibold leading-7 text-primary">
			<span>Данные Абитуриента</span>
			<div class="flex-1"></div>
			<a
				href="/dashboard/details/edit"
				role="button"
				class="flex items-center justify-center gap-2 opacity-50 hover:opacity-100"
			>
				<PenIcon />
				<span class="text-sm">Редактировать</span>
			</a>
		</h3>
		<p class="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">Персональные данные</p>
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

			<!-- <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
				<dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
				<dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
					<ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
						<li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
							<div class="flex w-0 flex-1 items-center">
								<svg
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
										clip-rule="evenodd"
									/>
								</svg>
								<div class="ml-4 flex min-w-0 flex-1 gap-2">
									<span class="truncate font-medium">resume_back_end_developer.pdf</span>
									<span class="flex-shrink-0 text-gray-400">2.4mb</span>
								</div>
							</div>
							<div class="ml-4 flex-shrink-0">
								<a class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
							</div>
						</li>
						<li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
							<div class="flex w-0 flex-1 items-center">
								<svg
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
										clip-rule="evenodd"
									/>
								</svg>
								<div class="ml-4 flex min-w-0 flex-1 gap-2">
									<span class="truncate font-medium">coverletter_back_end_developer.pdf</span>
									<span class="flex-shrink-0 text-gray-400">4.5mb</span>
								</div>
							</div>
							<div class="ml-4 flex-shrink-0">
								<a class="font-medium text-indigo-600 hover:text-indigo-500">Download</a>
							</div>
						</li>
					</ul>
				</dd>
			</div> -->
		</dl>
	</div>
</div>
