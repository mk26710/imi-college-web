<script lang="ts">
	import { cn } from "@/lib/cn";
	import type { HTMLLabelAttributes } from "svelte/elements";

	interface $$Props extends HTMLLabelAttributes {
		required?: boolean;
	}

	export let required: boolean = false;
</script>

<label
	{...$$props}
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		$$props.class,
	)}
>
	<slot></slot>
	{#if required}
		<span class="text-destructive">*</span>
	{/if}
</label>
