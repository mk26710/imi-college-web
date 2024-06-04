<script lang="ts">
	import Input from "@/components/ui/Input.svelte";
	import Label from "@/components/ui/Label.svelte";
	import Main from "@/components/Main.svelte";
	import Button from "@/components/ui/Button.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { login } from "@/lib/api";
	import { currentUser, getCurrentUser } from "@/stores/current-user";
	import { goto } from "$app/navigation";

	let username: string | undefined;
	let password: string | undefined;

	async function submit() {
		const body = { username, password };
		await login({ body });
		await getCurrentUser();
	}

	$: {
		if ($currentUser != null) {
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
		<form on:submit|preventDefault={submit} class="flex w-full max-w-96 flex-col gap-4">
			<div class="flex flex-col gap-1.5">
				<Label required>Логин</Label>
				<Input bind:value={username} placeholder="ivan01" required />
			</div>
			<div class="flex flex-col gap-1.5">
				<Label required>Пароль</Label>
				<Input bind:value={password} placeholder="******" required />
			</div>

			<Button type="submit">Войти</Button>
		</form>
	</div>
</Main>
