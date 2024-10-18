<script lang="ts">
	import { identifyNumber } from '$lib/utilities/input_type';
	import { generatePDF } from '$lib/utilities/generate_pdf';
	import type { Result } from '$lib/models/Result';
	import { formatBankAccount, formatNIP } from '$lib/utilities/format';
	import { EntityCardProperties } from '$lib/models/EntityCardProperties';

	export let result: Result;
	let cardEntity = new EntityCardProperties(result);

</script>

<div
	class={`flex flex-row items-center p-4 rounded-lg py-1 ${cardEntity.color} border border-gray-300  min-h-20`}
>
	<div class="flex flex-col w-2/5">
			{#if result.search.id_value}
				<p class="font-bold">
					{cardEntity.get_company_number()}
				</p>
			{:else}
				 {#if result.company}
					<p class="font-bold">
						Nie wypełniono - NIP {formatNIP(result.company.nip_value)}
					</p>
				 {/if}
			{/if}
		{#if result.company}
			<p class="mb-1 mt-1">{result.company.name}</p>
			<p>{result.company.address}</p>
		{:else}
			<p class="font-bold">Podmiot nie istnieje</p>
		{/if}
	</div>
	<div class="mt-2 sm:mt-0 w-3/5">
		<p class="text-lg font-semibold">Numer konta {formatBankAccount(result.search.bank_account) || '- Nie wypełniono' }</p>
		{#if cardEntity.bank_status}
			<p class="whitespace-pre-line">{cardEntity.bank_status}</p>
		{/if}
	</div>
	<div class="flex justify-end space-x-2 w-1/5">
		<span>{cardEntity.icon}</span>
		<p>{cardEntity.status}</p>
	</div>
	<div class="flex flex-col items-start sm:items-end text-blue-500 underline w-1/4">
		<button on:click={() => generatePDF(result, cardEntity)}>Pobierz potwierdzenie</button>
	</div>
</div>
