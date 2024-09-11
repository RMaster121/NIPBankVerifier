<script lang="ts">
	import type { Result } from '$lib/models/Result';
	import EntityCard from '$lib/components/EntityCard.svelte';

	export let data: { result: Result[] };
</script>

<div class="container mx-auto p-4 bg-white shadow-md rounded-lg">
	<div class="">
		<div class="flex items-center p-4">
			<button class="mr-2" on:click={() => history.back()} aria-label="Back">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-blue-500 hover:text-blue-700"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<h1 class="text-xl font-bold">Wyniki wyszukiwania</h1>
		</div>
		<div class="space-y-4 p-4">
			{#each data.result as result}
				<EntityCard {result} />
			{/each}
		</div>
	</div>
</div>
