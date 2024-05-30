<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "@/lib/cn";
	import Button from "@/components/Button.svelte";
	import { currentUser, getCurrentUser, logoutCurrentUser } from "@/stores/current-user";

	$: isSignUp = $page.route.id?.toLowerCase()?.includes("signup");
	$: isSignIn = $page.route.id?.toLowerCase()?.includes("signin");

	const handleLogout = async () => {
		await logoutCurrentUser();
		await getCurrentUser();
	};
</script>

<header
	class="sticky top-0 box-border flex h-16 justify-center border-b border-neutral-200 bg-white"
>
	<div class="container flex items-center">
		<a href="/" class="text-lg font-bold text-black">Колледж &laquo;МИР&raquo;</a>
		<div class="flex-1"></div>
		<div>
			{#if $currentUser == null}
				<Button href="signup" class={cn(isSignUp && "hidden")}>Регистрация</Button>
				<Button href="signin" variant="outline" class={cn(isSignIn && "hidden")}>Вход</Button>
			{:else}
				<Button variant="outline" onclick={handleLogout}>Выйти</Button>
			{/if}
		</div>
	</div>
</header>
