import type { Result } from './../models/Result';
import jsPDF from 'jspdf';
import { formatBankAccount } from './format';
import { callAddFont } from '$lib/Roboto-Regular-normal';
import { callAddFontBold } from '$lib/Roboto-Bold-normal';

export function generatePDF(result: Result): void {
	jsPDF.API.events.push(['addFonts', callAddFont]);
	jsPDF.API.events.push(['addFonts', callAddFontBold]);

	let font = 'Roboto-Regular';
	let fontBold = 'Roboto-Bold';


	const doc = new jsPDF();

	// Set the title
	doc.setFont(fontBold, 'normal');
	doc.setFontSize(20);
	doc.text('Raport - weryfikacja danych podmiotu', 20, 20);

	// Add the date
	doc.setFontSize(14);
	doc.setFont(font, 'normal');
	doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 28);

	// Add a horizontal line as a spacer
	doc.setDrawColor(150);
	doc.line(20, 33, 190, 33);

	// Add full name
	doc.setFontSize(16);
	doc.setFont(fontBold, 'normal');
	doc.text('Nazwa podmiotu', 20, 43);
	doc.setFont(font, 'normal');
	doc.setFontSize(18);
	doc.text(result.company.name, 20, 53);

	// Horizontal line separator
	doc.setDrawColor(150);
	doc.line(20, 58, 190, 58);

	// Add NIP, REGON, and address header
	doc.setFontSize(14);
	doc.setFont(fontBold, 'normal');
	doc.text('NIP', 20, 68);
	doc.text('REGON', 60, 68);
	doc.text('Adres siedziby', 110, 68);

	// Add NIP, REGON, and address values
	doc.setFont(font, 'normal');
	doc.text(result.company.nip_value, 20, 78);
	doc.text(result.company.regon_value, 60, 78);
	doc.text(result.company.address, 110, 78);

	// Horizontal line separator
	doc.setDrawColor(150);
	doc.line(20, 83, 190, 83);

	// Add "Konta bankowe podmiotu" header
	doc.setFont(fontBold, 'normal');
	doc.text('Konta bankowe podmiotu', 20, 93);

	// Add bank accounts
	doc.setFont(font, 'normal');
	doc.setFontSize(14);

	// Dynamically add each bank account
	let yIndex = 103;
	for (let i in result.company.bank_accounts) {
		const account = result.company.bank_accounts[i];
		if (account == result.search.bank_account && result.company.bank_accounts.length > 1) {
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
