<script lang="ts">
	import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.svelte";
	import Main from "@/components/Main.svelte";
	import Button from "@/components/ui/Button.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Main>
	<div class="container flex max-w-screen-lg flex-1 flex-col gap-4">
		<div>
			<Button variant="outline" href="/dashboard">
				<ChevronLeftIcon class="-mb-0.5" />
				<span>Назад</span>
			</Button>
		</div>

		<div class="rounded-lg border border-border bg-background px-4 py-6 md:px-8 md:pb-8">
			<div>
				<h2 class="text-base font-semibold leading-7">Удостоверения лчиности</h2>
				<p class="mt-1 text-sm leading-6 text-muted-foreground">
					Такие документы как паспорт, свидетельство о рождении, и т.п.
				</p>
			</div>

			{#if data.documentsIdentity != null && data.documentsIdentity.length === 0}
				<div class="mt-6 flex flex-col items-center justify-center py-10">
					<h3 class="mb-2 text-center text-base text-primary md:text-lg">
						Вам необходимо добавить документ удостоверения личности!
					</h3>
					<Button disabled>Добавить документ</Button>
				</div>
			{/if}
		</div>

		<div class="rounded-lg border border-border bg-background px-4 py-6 md:px-8 md:pb-8">
			<div>
				<h2 class="text-base font-semibold leading-7">Документы об образовании</h2>
				<p class="mt-1 text-sm leading-6 text-muted-foreground">
					Такие документы как аттест, диплом, и т.п.
				</p>
			</div>

			{#if data.documentsEducation != null && data.documentsEducation.length === 0}
				<div class="mt-6 flex flex-col items-center justify-center py-10">
					<h3 class="mb-2 text-center text-base text-primary md:text-lg">
						Вам необходимо добавить документ об образовании!
					</h3>
					<Button disabled>Добавить документ</Button>
				</div>
			{/if}
		</div>
	</div>
</Main>
