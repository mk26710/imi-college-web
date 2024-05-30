<script lang="ts">
	import { cn } from "@/lib/cn";
	import type { HTMLAttributes } from "svelte/elements";

	interface $$Props extends HTMLAttributes<HTMLDivElement> {}
</script>

<div {...$$props} class={cn("p-6 pt-0", $$props.class)}>
	<slot></slot>
</div>
