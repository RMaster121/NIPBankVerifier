<script lang="ts">
	import { identifyNumber } from '$lib/utilities/input_type';
	import { generatePDF } from '$lib/utilities/generate_pdf';
	import type { Result } from '$lib/models/Result';
	import { formatBankAccount, formatNIP } from '$lib/utilities/format';

	export let result: Result;

	function is_veryfied(result: Result): boolean {
		return result.company?.bank_accounts.includes(result.search.bank_account) || false;
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
		if (result.company!.bank_accounts.length == 0) {
			return 'Podmiot nie posiada kont bankowych.';
		}
		if (!is_veryfied(result)) {
			return 'Podane konto nie jest powiązane z podmiotem.';
		}
		if (result.company!.bank_accounts.length > 1) {
			return (
				'Podane konto jest jednym z ' +
				result.company!.bank_accounts.length +
				' kont powiązanych z podmiotem.'
			);
		}
		return 'Podane konto jest jedynym kontem powiązanym z podmiotem.';
	}
</script>

<div
	class={`flex flex-row items-center p-4 rounded-lg py-1 ${get_color(result)} border border-gray-300`}
>
	<div class="flex flex-col w-2/5">
		<p class="font-bold">
			{identifyNumber(result.search.id_value)}
			{identifyNumber(result.search.id_value) == 'NIP'
				? formatNIP(result.search.id_value)
				: result.search.id_value}
		</p>
		{#if result.company}
			<p class="mb-1 mt-1">{result.company.name}</p>
			<p>{result.company.address}</p>
		{:else}
			<p class="font-bold">Podmiot nie istnieje</p>
		{/if}
	</div>
	<div class="mt-2 sm:mt-0 w-3/5">
		<p class="text-lg font-semibold">Numer konta {formatBankAccount(result.search.bank_account)}</p>
		{#if result.company}
			<p>{bank_status(result)}</p>
		{/if}
	</div>
	<div class="flex justify-end space-x-2 w-1/5">
		<span>{get_icon(result)}</span>
		<p>{get_status(result)}</p>
	</div>
	<div class="flex flex-col items-start sm:items-end text-blue-500 underline w-1/4">
		<button on:click={() => generatePDF(result)}>Pobierz potwierdzenie</button>
	</div>
</div>
