<script>
	import '../app.css';
	import './styles.css';
</script>

<div class="topbar">
	<img src="https://picsum.photos/200" alt="Logo" class="logo w-5 h-5 m-4" />
	<h1 class="title text-gray-400 p">NIP Bank Verifier</h1>
</div>

<main class="">
	<slot />
</main>

<footer class="mt-auto bottombar">
	<div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
		<span class="text-sm text-gray-400 sm:text-center dark:text-gray-400">Made with SvelteKit</span>
	</div>
</footer>
