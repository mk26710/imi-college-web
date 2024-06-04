<script lang="ts">
	import Input from "@/components/ui/Input.svelte";
	import Main from "@/components/Main.svelte";
	import Button from "@/components/ui/Button.svelte";
	import Label from "@/components/ui/Label.svelte";
	import { registerUser } from "@/lib/api";
	import { goto } from "$app/navigation";
	import type { EventHandler } from "svelte/elements";
	
	const submit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
		const formData = new FormData(e.currentTarget ?? undefined); 
		const entries = Object.fromEntries(formData.entries());

		console.log(entries);

		const result = await registerUser(entries);
		if (result.success !== true) {
			return console.error(result.error);
		}

		return goto(`/signin?signedup=true&username=${result.data.username}`);
	}
</script>

<Main>
	<div class="container flex h-full flex-1 items-center justify-center">
		<form on:submit|preventDefault={submit} class="flex w-full max-w-96 flex-col gap-4">
			<div class="flex flex-col gap-1.5">
				<Label required>Имя</Label>
				<Input name="firstName" placeholder="Иван" required />
			</div>
			<div class="flex flex-col gap-1.5">
				<Label required>Фамилия</Label>
				<Input name="middleName" placeholder="Иванов" required />
			</div>
			<div class="flex flex-col gap-1.5">
				<Label>Отчество</Label>
				<Input name="lastName" placeholder="Иванович" />
			</div>
			<div class="flex flex-col gap-1.5">
				<Label required>Дата рождения</Label>
				<Input name="birthday" type="date" required />
			</div>

			<div class="flex flex-col gap-1.5">
				<Label required>Пол</Label>
				<div class="grid grid-cols-2 gap-1.5">
					<label
						class="flex h-9 cursor-pointer items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
					>
						<input type="radio" name="genderId" value="1" class="sr-only" required />
						<span>Мужской</span>
					</label>
					<label
						class="flex h-9 cursor-pointer items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors has-[:checked]:bg-primary has-[:checked]:text-primary-foreground"
					>
						<input type="radio" name="genderId" value="2" class="sr-only" required />
						<span>Женский</span>
					</label>
				</div>
			</div>

			<div class="flex flex-col gap-1.5">
				<Label required>Логин</Label>
				<Input name="username" autocomplete="username" placeholder="ivan99" required />
			</div>
			<div class="flex flex-col gap-1.5">
				<Label required>Пароль</Label>
				<Input
					name="password"
					type="password"
					autocomplete="new-password"
					placeholder="*******"
					required
				/>
			</div>
			<div class="flex flex-col gap-1.5">
				<Label required>Повтор пароля</Label>
				<Input
					name="password-confirm"
					type="password"
					autocomplete="current-password"
					placeholder="*******"
					required
				/>
			</div>
			<div class="flex flex-col gap-1.5">
				<Label required>Электронная почта</Label>
				<Input name="email" type="email" placeholder="ivan@example.ru" required />
			</div>
			<div class="flex flex-col gap-1.5">
				<Label required>Номер телефона</Label>
				<Input name="tel" type="tel" placeholder="+7 900 222 33 11" required />
			</div>

			<label class="flex flex-row gap-1.5 items-center">
				<input name="needsDorm" type="checkbox" class="h-4 w-4 appearance-none rounded-md border-2 border-border bg-transparent outline-none checked:bg-primary checked:border-primary">
				<span class="text-sm leading-none font-medium">Нуждаюсь в общежитие</span>
			</label>

			<Button type="submit" class="w-full">Стать абитуриентом</Button>
		</form>
	</div>
</Main>
