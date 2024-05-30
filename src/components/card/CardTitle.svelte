<script lang="ts">
	import { cn } from "@/lib/cn";
	import type { HTMLAttributes } from "svelte/elements";

	interface $$Props extends HTMLAttributes<HTMLHeadElement> {}
</script>

<h3 {...$$props} class={cn("font-semibold leading-none tracking-tight", $$props.class)}>
	<slot></slot>
</h3>
