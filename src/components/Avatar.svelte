<script lang="ts">
	export let username: string;
	export let src: string | undefined = undefined;
</script>

<div class="flex h-10 w-10 items-center justify-center rounded-full border border-border">
	{#if src != null}
		<img {src} decoding="async" loading="lazy" alt="{username}'s avatar" />
	{:else}
		<span class="text-sm font-semibold select-none">{username.at(0)}</span>
	{/if}
</div>
