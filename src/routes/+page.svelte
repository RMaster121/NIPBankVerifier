<script lang="ts">
	import type { Search } from '$lib/models/Search';
	import { sendRequest } from '$lib/utilities/send_request';
	import * as XLSX from 'xlsx';
	let showDialog = false;

	function openDialog() {
		showDialog = true;
	}

	function closeDialog() {
		showDialog = false;
	}

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

	function addRow(_: any, id_value: string = '', bank_account: string = '') {
		const formContainer = document.getElementById('form-container');
		const newRow = document.createElement('div');
		newRow.classList.add('flex', 'space-x-4', 'items-center', 'mt-2');

		newRow.innerHTML = `
      <input type="text" class="flex-1 p-2 border w-1/2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Wprowadź NIP/REGON">
      <input type="text" class="flex-1 p-2 border w-1/2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Wprowadź numer konta bankowego">
      <button type="button" class="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all duration-300">Usuń</button>
    `;
		formContainer?.appendChild(newRow);

		if (id_value && bank_account) {
			const inputs = newRow.querySelectorAll('input');
			inputs[0].value = id_value;
			inputs[1].value = bank_account;
		}

		const removeButton = newRow.querySelector('button');
		removeButton?.addEventListener('click', removeRow);
	}

	function removeRow(event: MouseEvent) {
		(event.target as HTMLButtonElement).parentElement?.remove();
	}

	function handleCSVUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target?.result as string;
				const rows = data.split('\n');
				rows.forEach((row) => {
					console.log(row);
					const columns = row.split(/[,;:]/);
					console.log(columns);
					if (columns.length >= 2) {
						const id_value = cleanInput(columns[0]);
						const bank_account = cleanInput(columns[1]);
						addRow(null, id_value, bank_account);
					}
				});
			};
			reader.readAsText(file);
		}
	}

	function handleXLSXUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target?.result as ArrayBuffer;
				const workbook = XLSX.read(data, { type: 'array' });
				const sheet = workbook.Sheets[workbook.SheetNames[0]];
				const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
				rows.forEach((row: any) => {
					console.log(row);
					const [id_value, bank_account] = row.map((cell: any) => cell.toString());
					if (id_value && bank_account) {
						addRow(null, cleanInput(id_value), cleanInput(bank_account));
					}
				});
			};
			reader.readAsArrayBuffer(file);
		}
	}

	function handleFileUpload(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			const extension = file.name.split('.').pop();
			if (extension === 'csv' || extension === 'txt') {
				handleCSVUpload(event);
			} else if (extension === 'xls' || extension === 'xlsx') {
				handleXLSXUpload(event);
			}
		}
		removeEmptyRow();
		closeDialog();
	}

	function importExcel() {
		const excelData = (document.getElementById('excel-data') as HTMLTextAreaElement).value;
		const rows = excelData.split('\n');
		rows.forEach((row) => {
			const [id_value, bank_account] = row.split('\t');
			if (id_value && bank_account) {
				addRow(null, cleanInput(id_value), cleanInput(bank_account));
			}
		});
		removeEmptyRow();
		closeDialog();
	}

	function removeEmptyRow() {
		const formContainer = document.getElementById('form-container');
		if (!formContainer?.children[0]) return;
		const inputs = formContainer.children[0].querySelectorAll('input');
		if (!inputs[0].value && !inputs[1].value) {
			formContainer.children[0].remove();
		}
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
			<div class="space-x-4">
				<button class="blue-button" on:click={addRow}>Dodaj podmiot</button>
				<button id="import-excel" on:click={openDialog}>Importuj z Excela</button>
			</div>
			<button class="blue-button" on:click={handleSubmit}>Zweryfikuj</button>
		</div>
	</div>
</div>

{#if showDialog}
	<button class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" on:click={closeDialog}
	></button>
	<div
		class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-lg flex flex-col items-center justify-center"
	>
		<div class="w-full p-9 bg-gray-50 rounded-2xl border border-gray-300 gap-1 grid border-dashed">
			<svg
				class="mx-auto"
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="File">
					<path
						id="icon"
						d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z"
						fill="#4F46E5"
					/>
				</g>
			</svg>

			<p class="text-center text-gray-600 font-bold mt-4">
				Wklej dane z Excela lub wybierz plik do importu
			</p>

			<textarea
				class="mt-4 w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Wklej dane z Excela w formacie 
| NIP/REGON | Numer konta bankowego |"
				id="excel-data"
			></textarea>

			<p class="text-center text-gray-600 my-2">lub</p>

			<div class="w-full flex flex-row">
				<input
					type="file"
					id="file-upload"
					accept=".csv, .txt, .xls, .xlsx"
					on:change={handleFileUpload}
					class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
				/>
			</div>

			<p class="text-center text-gray-600 text-sm mt-1">
				<strong>Obsługiwane formaty plików:<br /></strong>
				Microsoft Excel (XLS, XLSX)<br />
				CSV
			</p>

			<button
				class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
				on:click={closeDialog}
			>
				Anuluj
			</button>

			<button
				class="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
				on:click={importExcel}
			>
				Importuj
			</button>
		</div>
	</div>
{/if}

<style lang="postcss">
	input {
		@apply flex-1 p-2 border w-1/2 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500;
	}
	button {
		@apply px-4 py-2 text-white rounded-md transition-all duration-300;
	}
	#import-excel {
		@apply border text-black hover:bg-gray-200 border-gray-300;
	}
	.blue-button {
		@apply bg-blue-500 hover:bg-blue-600;
	}
</style>
