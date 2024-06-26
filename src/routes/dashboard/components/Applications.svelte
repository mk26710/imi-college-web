<script lang="ts">
	import PlusIcon from "@/components/icons/PlusIcon.svelte";
	import Button from "@/components/ui/Button.svelte";
</script>

<div class="rounded-lg border border-border bg-background px-8 py-6" id="applications">
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
</div>
