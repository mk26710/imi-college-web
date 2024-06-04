<script lang="ts">
	import { cn } from "@/lib/cn";
	import { cva, type VariantProps } from "class-variance-authority";
	import type { HTMLButtonAttributes, MouseEventHandler } from "svelte/elements";

	const buttonVariants = cva(
		"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
		{
			variants: {
				variant: {
					default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
					destructive:
						"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
					outline:
						"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
					secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
					ghost: "hover:bg-accent hover:text-accent-foreground",
					link: "text-primary underline-offset-4 hover:underline",
				},
				size: {
					default: "h-9 px-4 py-2",
					sm: "h-8 rounded-md px-3 text-xs",
					lg: "h-10 rounded-md px-8",
					icon: "h-9 w-9",
				},
			},
			defaultVariants: {
				variant: "default",
				size: "default",
			},
		},
	);

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof buttonVariants> {
		href?: string | undefined;
		onclick?: MouseEventHandler<HTMLButtonElement> | null;
	}

	export let onclick: $$Props["onclick"] = undefined;
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let href: $$Props["href"] = undefined;

	$: isLink = typeof href === "string" && href.length > 0;
</script>

<svelte:element
	this={isLink ? "a" : "button"}
	{...$$props}
	{href}
	role="button"
	aria-roledescription="button"
	tabindex="0"
	class={cn(buttonVariants({ variant, size, class: $$props.class }))}
	on:click={onclick}
>
	<slot />
</svelte:element>
