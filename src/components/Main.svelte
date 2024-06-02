<script lang="ts">
	import { cn } from "@/lib/cn";
</script>

<main
	class={cn(
		"flex min-h-[calc(100vh-4rem)] flex-col items-center bg-background py-4",
		$$props.class,
	)}
>
	<slot></slot>
</main>
