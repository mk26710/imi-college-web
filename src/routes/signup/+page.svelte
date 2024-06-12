<script lang="ts">
	import Input from "@/components/ui/Input.svelte";
	import Main from "@/components/Main.svelte";
	import Button from "@/components/ui/Button.svelte";
	import Label from "@/components/ui/Label.svelte";
	import { registerUser } from "@/lib/api";
	import { goto } from "$app/navigation";
	import type { EventHandler } from "svelte/elements";
	import Card from "$ui/card/Card.svelte";
	import CardHeader from "$ui/card/CardHeader.svelte";
	import CardTitle from "$ui/card/CardTitle.svelte";
	import CardDescription from "$ui/card/CardDescription.svelte";
	import CardContent from "@/components/ui/card/CardContent.svelte";

	const submit: EventHandler<SubmitEvent, HTMLFormElement> = async (e) => {
		const formData = new FormData(e.currentTarget ?? undefined);
		const entries = Object.fromEntries(formData.entries());

		console.log(entries);

		const result = await registerUser(entries);
		if (result.success !== true) {
			return console.error(result.error);
		}

		return goto(`/signin?signedup=true&username=${result.data.username}`);
	};
</script>

<Main>
	<div class="container flex h-full flex-1 items-center justify-center">
		<Card class="w-full max-w-screen-sm">
			<CardHeader>
				<CardTitle>Регистрация</CardTitle>
				<CardDescription>Заполните все необходимые поля</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					on:submit|preventDefault={submit}
					class="grid w-full auto-cols-min grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-6"
				>
					<div class="flex flex-col gap-1.5 sm:col-span-2">
						<Label required>Имя</Label>
						<Input name="firstName" placeholder="Иван" required />
					</div>
					<div class="flex flex-col gap-1.5 sm:col-span-2">
						<Label required>Фамилия</Label>
						<Input name="middleName" placeholder="Иванов" required />
					</div>
					<div class="flex flex-col gap-1.5 sm:col-span-2">
						<Label>Отчество</Label>
						<Input name="lastName" placeholder="Иванович" />
					</div>
					<div class="flex flex-col gap-1.5 sm:col-span-3">
						<Label required>Дата рождения</Label>
						<Input name="birthday" type="date" required />
					</div>

					<div class="flex flex-col gap-1.5 sm:col-span-3">
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

					<div class="flex flex-col gap-1.5 sm:col-span-full">
						<Label required>Логин</Label>
						<Input name="username" autocomplete="username" placeholder="ivan99" required />
					</div>
					<div class="flex flex-col gap-1.5 sm:col-span-3">
						<Label required>Пароль</Label>
						<Input
							name="password"
							type="password"
							autocomplete="new-password"
							placeholder="*******"
							required
						/>
					</div>
					<div class="flex flex-col gap-1.5 sm:col-span-3">
						<Label required>Повтор пароля</Label>
						<Input
							name="password-confirm"
							type="password"
							autocomplete="current-password"
							placeholder="*******"
							required
						/>
					</div>

					<div class="flex flex-col gap-1.5 sm:col-span-3">
						<Label required>Номер телефона</Label>
						<Input name="tel" type="tel" placeholder="+7 900 222 33 11" required />
					</div>
					<div class="flex flex-col gap-1.5 sm:col-span-3">
						<Label required>Электронная почта</Label>
						<Input name="email" type="email" placeholder="ivan@example.ru" required />
					</div>

					<label class="col-span-full flex flex-row items-center gap-1.5">
						<input
							name="needsDorm"
							type="checkbox"
							class="form-checkbox h-4 w-4 rounded-md border border-border checked:bg-primary focus:bg-primary focus:text-primary focus:ring-primary"
						/>
						<span class="text-sm font-medium leading-none">Нуждаюсь в общежитие</span>
					</label>

					<Button type="submit" class="col-span-full w-full">Стать абитуриентом</Button>
				</form>
			</CardContent>
		</Card>
	</div>
</Main>
