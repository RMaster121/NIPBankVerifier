<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster />
<main class="h-screen flex flex-col justify-between">
	<slot />
	<Footer />
</main>

