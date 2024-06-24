<script lang="ts">
	import type { LayoutData } from "./$types";
	import Header from "@/components/Header.svelte";
	import Footer from "@/components/Footer.svelte";
	import "@/css/inter.css";
	import "@/css/main.css";
	import NavigationSpinner from "@/components/NavigationSpinner.svelte";

	export let data: LayoutData;
</script>

<NavigationSpinner />
<Header currentUser={data.currentUser} />
<slot />
<Footer />
