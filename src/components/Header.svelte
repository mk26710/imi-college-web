<script lang="ts">
	import { page } from "$app/stores";
	import { cn } from "@/lib/cn";
	import Button from "@/components/ui/Button.svelte";
	import ExitIcon from "@/components/icons/ExitIcon.svelte";
	import MoonIcon from "@/components/icons/MoonIcon.svelte";
	import SunIcon from "@/components/icons/SunIcon.svelte";
	import Avatar from "@/components/ui/Avatar.svelte";
	import { appTheme, setDarkTheme, setLightTheme } from "@/stores/app-theme";
	import { clickoutside } from "@svelte-put/clickoutside";
	import { scale } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { logout, type getCurrentUser } from "@/lib/api";
	import { invalidateAll } from "$app/navigation";

	export let currentUser: Awaited<ReturnType<typeof getCurrentUser>>;

	const NAV_LINKS = [
		{ href: "/", text: "Главная" },
		{ href: "/dashboard", text: "Личный кабинет" },
	];

	$: isSignUp = $page.route.id?.toLowerCase()?.includes("signup");
	$: isSignIn = $page.route.id?.toLowerCase()?.includes("signin");

	let isOpen = false;

	const handleDropdown = () => {
		isOpen = !isOpen;
	};

	const handleClose = () => {
		isOpen = false;
	};

	const handleLogout = async () => {
		await logout();
		handleClose();
		invalidateAll();
	};

	const handleSwitchTheme = () => {
		if ($appTheme !== "dark") {
			setDarkTheme();
		} else {
			setLightTheme();
		}
	};
</script>

<header
	class="sticky top-0 z-50 box-border flex h-16 justify-center border-b border-border bg-background/90 backdrop-blur-sm"
>
	<div class="container flex items-center">
		<div class="flex">
			<a href="/" class="mr-4 text-lg font-bold text-primary">Колледж &laquo;МИР&raquo;</a>
			<nav class="flex items-center gap-4 text-sm">
				{#each NAV_LINKS as link (link.text)}
					<a href={link.href} class="opacity-80 transition-all hover:opacity-100">{link.text}</a>
				{/each}
			</nav>
		</div>
		<div class="flex-1"></div>
		<div class="flex items-center">
			<Button onclick={handleSwitchTheme} variant="ghost" class="mr-2 aspect-square p-0">
				{#if $appTheme === "dark"}
					<SunIcon />
				{:else}
					<MoonIcon />
				{/if}
			</Button>

			{#if currentUser == null}
				<Button href="signup" variant="outline" class={cn(isSignUp && "hidden")}>
					Регистрация
					</Button>
				<Button href="signin" class={cn("ml-2", isSignIn && "hidden")}>Вход</Button>
			{:else}
				<div class="relative">
					<button on:click|stopPropagation={handleDropdown}>
						<Avatar username={currentUser.username} />
					</button>

					{#if isOpen}
						<div
							class="absolute right-0 top-14 rounded-md border border-border bg-background p-1 shadow"
							use:clickoutside
							on:clickoutside={handleClose}
							transition:scale={{ duration: 200, opacity: 0.1, start: 0.5, easing: quintOut }}
						>
							<Button
								variant="ghost"
								size="sm"
								class="px-2 hover:bg-destructive/20 hover:text-destructive"
								onclick={handleLogout}
							>
								<ExitIcon class="mr-2 h-3 w-3" />
								<span>Выйти из системы</span>
							</Button>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</header>
