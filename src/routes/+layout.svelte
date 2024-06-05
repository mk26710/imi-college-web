<script lang="ts">
	import type { LayoutData } from "./$types";
	import Header from "@/components/Header.svelte";
	import Footer from "@/components/Footer.svelte";
	import "@/css/inter.css";
	import "@/css/main.css";

	export let data: LayoutData;
</script>

<Header currentUser={data.currentUser} />
<slot />
<Footer />
