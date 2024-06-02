<script lang="ts">
	import Main from "@/components/Main.svelte";
	import Card from "@/components/card/Card.svelte";
	import CardContent from "@/components/card/CardContent.svelte";
	import CardHeader from "@/components/card/CardHeader.svelte";
	import CardTitle from "@/components/card/CardTitle.svelte";
</script>

<Main>
	<div class="container">
		<Card>
			<CardHeader>
				<CardTitle>Личные данные</CardTitle>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	</div>
</Main>
