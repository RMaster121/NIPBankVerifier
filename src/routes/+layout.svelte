<script>
	import '../app.css';
	import Footer from '$lib/elements/Footer.svelte';
</script>

<main class="h-screen flex flex-col justify-between">
	<slot />
	<Footer />
</main>

