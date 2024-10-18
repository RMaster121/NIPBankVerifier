import { identifyNumber } from '$lib/utilities/input_type';
import type { Result } from './../models/Result';
import jsPDF from 'jspdf';
import { formatBankAccount } from './format';
import { callAddFont } from '$lib/Roboto-Regular-normal';
import { callAddFontBold } from '$lib/Roboto-Bold-normal';
import type { EntityCardProperties } from '$lib/models/EntityCardProperties';

export function generatePDF(result: Result, cardEntity: EntityCardProperties): void {
	jsPDF.API.events.push(['addFonts', callAddFont]);
	jsPDF.API.events.push(['addFonts', callAddFontBold]);

	let font = 'Roboto-Regular';
	let fontBold = 'Roboto-Bold';


	const doc = new jsPDF();

	let yGlobal = 20

	// Set the title
	doc.setFont(fontBold, 'normal');
	doc.setFontSize(12);
	doc.text('Raport - weryfikacja danych podmiotu', 20, yGlobal);

	// Add the date
	doc.setFont(font, 'normal');
	yGlobal += 8
	doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, yGlobal);

	// Add a horizontal line as a spacer
	doc.setDrawColor(150);
	yGlobal += 5
	doc.line(20, yGlobal, 190, yGlobal);


	// Add search parameters
	doc.setFont(fontBold, 'normal');
	yGlobal += 10
	doc.text('Parametry zapytania', 20, yGlobal);

	// Add search parameters headers
	yGlobal += 10
	doc.text('NIP/REGON', 20, yGlobal);
	doc.text('Numer konta bankowego', 75, yGlobal);
	doc.text('Wynik', 190, yGlobal, { align: 'right' });

	// Add search parameters values
	doc.setFont(font, 'normal');
	yGlobal += 10
	let nipInputExist = result.search.id_value != '';
	let bankInputExist = result.search.bank_account != '';
	doc.text(nipInputExist ? cardEntity.get_company_number() : "Nie wypełniono", 20, yGlobal);
	doc.text(bankInputExist ? formatBankAccount(result.search.bank_account) : "Nie wypełniono", 75, yGlobal);
	doc.text(cardEntity.status, 190, yGlobal, { align: 'right' });


	// Horizontal line separator
	doc.setDrawColor(150);
	yGlobal += 5
	doc.line(20, yGlobal, 190, yGlobal);

	if (!result.company) {
		doc.setFont(fontBold, 'normal');
		yGlobal += 10
		doc.text('Brak danych dla podanego numeru', 20, yGlobal);
		doc.setFont(font, 'normal');
		doc.text('Sprawdź poprawność wprowadzonych danych', 20, yGlobal + 10);
		doc.output('dataurlnewwindow');
		return;
	}

	// Add full name
	doc.setFont(fontBold, 'normal');
	yGlobal += 10
	doc.text('Nazwa podmiotu', 20, yGlobal);
	doc.setFont(font, 'normal');
	let splitText = doc.splitTextToSize(result.company.name, 170);
	yGlobal += 10
	doc.text(splitText, 20, yGlobal);
	yGlobal += splitText.length * 5

	// Horizontal line separator
	doc.setDrawColor(150);
	doc.line(20, yGlobal, 190, yGlobal);

	// Add NIP, REGON, and address header
	doc.setFont(fontBold, 'normal');
	yGlobal += 10
	doc.text('NIP', 20, yGlobal);
	doc.text('REGON', 60, yGlobal);
	doc.text('Adres siedziby', 110, yGlobal);

	// Add NIP, REGON, and address values
	yGlobal += 10
	doc.setFont(font, 'normal');
	doc.text(result.company.nip_value, 20, yGlobal);
	doc.text(result.company.regon_value, 60, yGlobal);
	let splitAddress = result.company.address.split(',');
	let splitTextAddress = doc.splitTextToSize(splitAddress[0], 170);
	doc.text(splitTextAddress, 110, yGlobal);
	yGlobal += splitTextAddress.length * 5;
	doc.text(splitAddress[1], 110, yGlobal);
	
	// Horizontal line separator
	yGlobal += 5
	doc.setDrawColor(150);
	doc.line(20, yGlobal, 190, yGlobal);

	// Add "Konta bankowe podmiotu" header
	yGlobal += 10
	doc.setFont(fontBold, 'normal');
	doc.text('Konta bankowe podmiotu', 20, yGlobal);

	// Add bank accounts
	doc.setFont(font, 'normal');

	// Dynamically add each bank account
	let yIndex = yGlobal + 10;
	for (let i in result.company.bank_accounts) {
		const account = result.company.bank_accounts[i];
		if (account == result.search.bank_account) {
			doc.setFont(fontBold, 'normal');
			doc.text(`- ${formatBankAccount(account)}`, 20, yIndex);
			doc.setFont(font, 'normal');
		} else {
			doc.text(`- ${formatBankAccount(account)}`, 20, yIndex);
		}

		yIndex += 10;
		if (yIndex > doc.internal.pageSize.height - 20) {
			doc.addPage();
			yIndex = 20;
		}
	}

	for (let i in doc.internal.pages) {
		doc.setPage(Number(i));
		doc.setFontSize(12);
		doc.text('Strona: ' + i + '/' + (doc.internal.pages.length - 1), 
			doc.internal.pageSize.width/2, 
		doc.internal.pageSize.height - 10, { align: 'center' });
	}

	//Set the filename
	doc.setProperties({
		title: `Raport-${new Date().toLocaleDateString().split('.').join('-')}-${result.company.nip_value}.pdf`
	});

	// Save the PDF
	doc.output('dataurlnewwindow');
}
