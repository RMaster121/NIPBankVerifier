<script lang="ts">
	import type { Result } from '$lib/models/Result';
	import EntityCard from '$lib/components/EntityCard.svelte';
	import * as XLSX from 'xlsx';

	function exportToExcel() {
		let dataToWrite = [];
		for (let i in data.result) {
			if (!data.result[i].company) {
				dataToWrite.push({
					'Lp.': parseInt(i) + 1,
					'Nazwa': 'Brak danych',
					'Miasto': 'Brak danych',
					'NIP': data.result[i].search.id_value,
					'Konto bankowe': data.result[i].search.bank_account,
					'Status zgodności konta': 'Brak danych'
				});
			} else {
				dataToWrite.push({
					'Lp.': parseInt(i) + 1,
					'Nazwa': data.result[i].company.name,
					'Miasto': data.result[i].company.address.split(' ').at(-1),
					'NIP': data.result[i].company.nip_value,
					'Konto bankowe': data.result[i].search.bank_account,
					'Status zgodności konta': data.result[i].company.bank_accounts.includes(
						data.result[i].search.bank_account
					)
						? 'Zgodne'
						: 'Niezgodne'
				});
			}
		}
		const ws = XLSX.utils.json_to_sheet(dataToWrite);
		ws['!cols'] = [{ wch: 5 }, { wch: 30 }, { wch: 10 }, { wch: 10 }, { wch: 26 }, { wch: 20 }];
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Wyniki werfikacji');
		XLSX.writeFile(wb, `wyniki_weryfikacji_${new Date().toISOString().split('T')[0]}.xlsx`);
	}

	export let data: { result: Result[] };
</script>

<div class="container mx-auto p-4 bg-white shadow-md rounded-lg">
	<div>
		<div class="flex justify-between">
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
				<h1 class="text-xl font-bold">Wyniki weryfikacji</h1>
			</div>
			<button
				class="bg-blue-500 text-white m-3 py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 flex items-center"
				on:click={exportToExcel}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="18"
					height="18"
					viewBox="0 0 50 50"
					class="fill-current w-6 h-6 mr-2"
				>
					<path
						d="M 28.875 0 C 28.855469 0.0078125 28.832031 0.0195313 28.8125 0.03125 L 0.8125 5.34375 C 0.335938 5.433594 -0.0078125 5.855469 0 6.34375 L 0 43.65625 C -0.0078125 44.144531 0.335938 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 29.101563 50.023438 29.402344 49.949219 29.632813 49.761719 C 29.859375 49.574219 29.996094 49.296875 30 49 L 30 44 L 47 44 C 48.09375 44 49 43.09375 49 42 L 49 8 C 49 6.90625 48.09375 6 47 6 L 30 6 L 30 1 C 30.003906 0.710938 29.878906 0.4375 29.664063 0.246094 C 29.449219 0.0546875 29.160156 -0.0351563 28.875 0 Z M 28 2.1875 L 28 6.53125 C 27.867188 6.808594 27.867188 7.128906 28 7.40625 L 28 42.8125 C 27.972656 42.945313 27.972656 43.085938 28 43.21875 L 28 47.8125 L 2 42.84375 L 2 7.15625 Z M 30 8 L 47 8 L 47 42 L 30 42 L 30 37 L 34 37 L 34 35 L 30 35 L 30 29 L 34 29 L 34 27 L 30 27 L 30 22 L 34 22 L 34 20 L 30 20 L 30 15 L 34 15 L 34 13 L 30 13 Z M 36 13 L 36 15 L 44 15 L 44 13 Z M 6.6875 15.6875 L 12.15625 25.03125 L 6.1875 34.375 L 11.1875 34.375 L 14.4375 28.34375 C 14.664063 27.761719 14.8125 27.316406 14.875 27.03125 L 14.90625 27.03125 C 15.035156 27.640625 15.160156 28.054688 15.28125 28.28125 L 18.53125 34.375 L 23.5 34.375 L 17.75 24.9375 L 23.34375 15.6875 L 18.65625 15.6875 L 15.6875 21.21875 C 15.402344 21.941406 15.199219 22.511719 15.09375 22.875 L 15.0625 22.875 C 14.898438 22.265625 14.710938 21.722656 14.5 21.28125 L 11.8125 15.6875 Z M 36 20 L 36 22 L 44 22 L 44 20 Z M 36 27 L 36 29 L 44 29 L 44 27 Z M 36 35 L 36 37 L 44 37 L 44 35 Z"
					></path>
				</svg>
				Eksportuj do Excela
			</button>
		</div>
	</div>
	<div class="space-y-4 p-4">
		{#each data.result as result}
			<EntityCard {result} />
		{/each}
	</div>
</div>
