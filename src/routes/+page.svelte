<script lang="ts">
	import type { Search } from '$lib/models/Search';
	import { sendRequest } from '$lib/utilities/send_request';

	function cleanInput(input: string): string {
		return input.replaceAll(' ', '').replaceAll('-', '').replaceAll('_', '');
	}

	function handleSubmit() {
		const rows = document.querySelectorAll('#form-container div');
		let searches: Search[] = [];
		rows.forEach((row) => {
			const inputs = row.querySelectorAll('input');
			const id_value = cleanInput(inputs[0].value);
			const bank_account = cleanInput(inputs[1].value);
			if (id_value && bank_account) {
				searches.push({ id_value, bank_account });
			}
		});
		sendRequest(searches);
	}

	function addRow() {
		const formContainer = document.getElementById('form-container');
		const newRow = document.createElement('div');
		newRow.classList.add('flex', 'space-x-4', 'items-center', 'mt-2');

		newRow.innerHTML = `
      <input type="text" class="flex-1 p-2 border w-1/2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Wprowadź NIP/REGON">
      <input type="text" class="flex-1 p-2 border w-1/2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Wprowadź numer konta bankowego">
      <button type="button" class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-300">Usuń</button>
    `;
		formContainer?.appendChild(newRow);

		const removeButton = newRow.querySelector('button');
		removeButton?.addEventListener('click', removeRow);
	}

	function removeRow(event: MouseEvent) {
		(event.target as HTMLButtonElement).parentElement?.remove();
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-xl font-bold mb-4">Zweryfikuj podmiot</h1>
	<div class="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
		<h1 class="text-2xl font-bold text-center mb-6">Wprowadź NIP i konto bankowe podmiotu</h1>
		<div id="form-container" class="space-y-4">
			<div class="flex space-x-4 items-center">
				<input type="text" placeholder="Wprowadź NIP/REGON" />
				<input type="text" placeholder="Wprowadź numer konta bankowego" />
				<button class="bg-red-500 hover:bg-red-600" on:click={removeRow}>Usuń</button>
			</div>
		</div>

		<div class="flex justify-between mt-6">
			<button id="add-row" class="bg-blue-500 hover:bg-blue-600" on:click={addRow}
				>Dodaj podmiot</button
			>
			<button id="submit" class="bg-blue-500 hover:bg-blue-600" on:click={handleSubmit}
				>Zweryfikuj</button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	input {
		@apply flex-1 p-2 border w-1/2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500;
	}
	button {
		@apply px-4 py-2 text-white rounded-md transition-all duration-300;
	}
</style>
