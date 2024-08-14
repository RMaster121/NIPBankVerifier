<script>
	let rows = [
		{ id: 1, value1: '', value2: '', active: true },
		{ id: 2, value1: '', value2: '', active: false }
	];

	/**
	 * @param {number} index
	 */
	function activateRow(index) {
		if ((rows[index].value1 || rows[index].value2) && !rows[index + 1].active) {
			rows[index + 1].active = true;
			rows.push({ id: rows.length + 1, value1: '', value2: '', active: false });
		}
	}

	function handleSubmit() {
		alert('Form submitted!');
		console.log(rows);
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-xl font-bold mb-4">Zweryfikuj podmiot</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="space-y-4">
			{#each rows as row, index}
				<div class="flex space-x-4 items-center">
					<div class="flex flex-1">
						<input
							type="text"
							bind:value={row.value1}
							placeholder="NIP/REGON/KRS"
							on:input={() => activateRow(index)}
							disabled={!row.active}
                            class="rounded-l-lg"
                            />
						<span
							class="flex items-center px-4 bg-gray-200 text-gray-700 border border-gray-300 rounded-r-lg"
						>
							NIP
						</span>
					</div>
					<input
						type="text"
						bind:value={row.value2}
						placeholder="Numer konta bankowego"
                        class="rounded-lg"
						on:input={() => activateRow(index)}
						disabled={!row.active}
					/>
				</div>
			{/each}
		</div>
		<div class="mt-4">
			<button
				type="submit"
				class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
				disabled={!rows.some(row => row.value1 || row.value2)}
			>
				Submit
			</button>
		</div>
	</form>
</div>

<style lang="postcss">
	input[disabled] {
		@apply bg-gray-100;
	}
	input {
		@apply flex-1 p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500;
	}
	button[disabled] {
		@apply bg-gray-300 cursor-not-allowed;
	}
	button {
		@apply px-4 py-2 bg-blue-500 text-white rounded-lg;
	}
</style>
