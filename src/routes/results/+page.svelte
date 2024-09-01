<script lang="ts">
	import type { Result } from '$lib/models/Result';
	import type { PageData } from './$types';

	function is_veryfied(result: Result): boolean {
		return result.company.bank_accounts.includes(result.search.bank_account);
	}

	function get_color(result: Result): string {
		if (is_veryfied(result)) {
			return 'bg-green-100';
		} else {
			return 'bg-red-100';
		}
	}

	function get_icon(result: Result): string {
		if (is_veryfied(result)) {
			return '✔️';
		}
		return '❌';
	}

	function get_status(result: Result): string {
		if (is_veryfied(result)) {
			return 'Dane zgodne';
		}
		return 'Brak zgodności';
	}

	function bank_status(result: Result): string {
        if (result.company.bank_accounts.length == 0) {
            return 'Podmiot nie posiada kont bankowych.';
        }
		if (!is_veryfied(result)) {
			return 'Podane konto nie jest powiązane z podmiotem.';
		}
		if (result.company.bank_accounts.length > 1) {
			return (
				'Podane konto jest jednym z ' + result.company.bank_accounts.length + ' kont powiązanych z podmiotem.'
			);
		}
        return 'Podane konto jest jedynym kontem powiązanym z podmiotem.';
		
	}

	export let data: PageData;
</script>

<div class="container mx-auto p-4">
	<div class="bg-white shadow-md rounded-lg">
		<h1 class="text-xl font-bold p-4">Wyniki wyszukiwania</h1>
		<div class="space-y-4 p-4">
			{#each data.result as result}
				<div class={`p-4 rounded-lg ${get_color(result)} border border-gray-300`}>
					<div
						class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center"
					>
						<div class="flex-1">
							<div class="flex flex-wrap sm:flex-nowrap sm:space-x-8">
								<div>
									<p class="font-bold">{result.search.id_type} {result.search.id_value}</p>
									<p>{result.company.name}</p>
									<p>{result.company.address}</p>
								</div>
								<div class="mt-2 sm:mt-0">
									<p class="text-lg font-semibold">Numer konta {result.search.bank_account}</p>
									<p>{bank_status(result)}</p>
								</div>
							</div>
						</div>
						<div
							class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-4 sm:mt-0"
						>
							<div class="flex items-center space-x-2">
								<span>{get_icon(result)}</span>
								<p>{get_status(result)}</p>
							</div>
							<div class="flex flex-col items-start sm:items-end text-blue-500 underline">
								<button>Pobierz potwierdzenie</button>
								<button>Link do oryginału</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
