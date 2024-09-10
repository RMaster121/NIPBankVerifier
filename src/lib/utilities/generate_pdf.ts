import type { Result } from './../models/Result';
import jsPDF from 'jspdf';
import { formatBankAccount } from './format';

export function generatePDF(result: Result): void {
	const doc = new jsPDF();

	// Set the title
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(20);
	doc.text('Raport - weryfikacja danych podmiotu', 20, 20);

	// Add the date
	doc.setFontSize(14);
	doc.setFont('helvetica', 'normal');
	doc.text(`Data: ${new Date().toLocaleDateString()}`, 20, 28);

	// Add a horizontal line as a spacer
	doc.setDrawColor(150);
	doc.line(20, 33, 190, 33);

	// Add full name
	doc.setFontSize(16);
	doc.setFont('helvetica', 'bold');
	doc.text('Nazwa podmiotu', 20, 43);
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(18);
	doc.text(result.company.name, 20, 53);

	// Horizontal line separator
	doc.setDrawColor(150);
	doc.line(20, 58, 190, 58);

	// Add NIP, REGON, and address header
	doc.setFontSize(14);
	doc.setFont('helvetica', 'bold');
	doc.text('NIP', 20, 68);
	doc.text('REGON', 60, 68);
	doc.text('Adres siedziby', 110, 68);

	// Add NIP, REGON, and address values
	doc.setFont('helvetica', 'normal');
	doc.text(result.company.nip_value, 20, 78);
	doc.text(result.company.regon_value, 60, 78);
	doc.text(result.company.address, 110, 78);

	// Horizontal line separator
	doc.setDrawColor(150);
	doc.line(20, 83, 190, 83);

	// Add "Konta bankowe podmiotu" header
	doc.setFont('helvetica', 'bold');
	doc.text('Konta bankowe podmiotu', 20, 93);

	// Add bank accounts
	doc.setFont('helvetica', 'normal');
	doc.setFontSize(14);

	// Dynamically add each bank account
	result.company.bank_accounts.forEach((account, index) => {
		const yPos = 103 + index * 10; // Start at y = 103 and add 10 for each account
		if (account == result.search.bank_account && result.company.bank_accounts.length > 1) {
			doc.setFont('helvetica', 'bold');
			doc.text(`- ${formatBankAccount(account)}`, 20, yPos);
			doc.setFont('helvetica', 'normal');
		}
		doc.text(`- ${formatBankAccount(account)}`, 20, yPos);
	});

	// Save the PDF
	doc.save(`Raport-${new Date().toLocaleDateString().split('.').join('-')}-${result.company.nip_value}.pdf`);
}
