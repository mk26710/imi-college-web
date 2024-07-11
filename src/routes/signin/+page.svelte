<script lang="ts">
	import Input from "@/components/ui/Input.svelte";
	import Label from "@/components/ui/Label.svelte";
	import Main from "@/components/Main.svelte";
	import Button from "@/components/ui/Button.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { login } from "@/lib/api";
	import { goto, invalidateAll } from "$app/navigation";
	import type { PageData } from "./$types";
	import Card from "@/components/ui/card/Card.svelte";
	import CardContent from "@/components/ui/card/CardContent.svelte";
	import CardHeader from "@/components/ui/card/CardHeader.svelte";
	import CardTitle from "@/components/ui/card/CardTitle.svelte";
	import CardDescription from "@/components/ui/card/CardDescription.svelte";

	export let data: PageData;

	let username: string | undefined;
	let password: string | undefined;

	async function submit() {
		const body = { username, password };
		await login({ body });
		invalidateAll();
	}

	$: {
		if (data.currentUser != null) {
			goto("/");
		}
	}

	onMount(() => {
		const isSignedUp = $page.url.searchParams.get("signedup") === "true";
		if (isSignedUp) {
			const predefinedUsername = $page.url.searchParams.get("username");
			if (typeof predefinedUsername === "string" && predefinedUsername.length > 0) {
				username = predefinedUsername;
			}
		}
	});
</script>

<Main>
	<div class="container flex h-full flex-1 items-center justify-center">
		<Card class="w-full max-w-96">
			<CardHeader>
				<CardTitle>Вход в систему</CardTitle>
				<CardDescription>Укажите логин и пароль</CardDescription>
			</CardHeader>
			<CardContent>
				<form on:submit|preventDefault={submit} class="flex flex-col gap-4">
					<div class="flex flex-col gap-1.5">
						<Label required>Логин</Label>
						<Input bind:value={username} placeholder="ivan01" autocomplete="username" required />
					</div>
					<div class="flex flex-col gap-1.5">
						<Label required>Пароль</Label>
						<Input
							bind:value={password}
							type="password"
							autocomplete="current-password"
							placeholder="******"
							required
						/>
					</div>

					<Button type="submit">Войти</Button>
				</form>
				<div class="text-sm mt-2">
					<span>Для входа в сиситему нужен аккаунт, который можно <a href="/signup" class="underline hover:cursor-pointer underline-offset-4">создать здесь</a>.</span>
				</div>
			</CardContent>
		</Card>
	</div>
</Main>
