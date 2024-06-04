<script lang="ts">
	import { cn } from "@/lib/cn";
	import type { HTMLAttributes } from "svelte/elements";

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div
	{...$$props}
	class={cn("rounded-xl border bg-card text-card-foreground shadow", $$props.class)}
>
	<slot></slot>
</div>
