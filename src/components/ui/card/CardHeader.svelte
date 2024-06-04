<script lang="ts">
	import { cn } from "@/lib/cn";
	import type { HTMLAttributes } from "svelte/elements";

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$props} class={cn("flex flex-col space-y-1.5 p-6", $$props.class)}>
	<slot></slot>
</div>
