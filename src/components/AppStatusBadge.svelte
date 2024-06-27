<script lang="ts">
	import { cn } from "@/lib/cn";

	let statusValue: string;
	let classes: string = '';

	export { statusValue, classes as class };
</script>

<span
	class={cn(
		"inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-700/20 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-300/10",
		classes,
	)}
>
	{statusValue}
</span>
