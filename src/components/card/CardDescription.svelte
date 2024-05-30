<script lang="ts">
	import { cn } from "@/lib/cn";
	import type { HTMLAttributes } from "svelte/elements";

	interface $$Props extends HTMLAttributes<HTMLParagraphElement> {}
</script>

<p {...$$props} class={cn("text-sm text-muted-foreground", $$props.class)}>
	<slot></slot>
</p>
