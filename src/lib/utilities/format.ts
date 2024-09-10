/**
 * Both functions are used to format bank account and NIP numbers.
 * They will return the formatted string if the input is valid.
 * Otherwise, they will return the input string.
 */

export function formatBankAccount(account: string): string {
	if (account.length != 26) return account;
	const formatted = [
		account.slice(0, 2),
		account.slice(2, 6),
		account.slice(6, 10),
		account.slice(10, 14),
		account.slice(14, 18),
		account.slice(18, 22),
		account.slice(22, 26)
	].join(' ');
	return formatted;
}

export function formatNIP(nip: string): string {
	if (nip.length != 10) return nip;
	const formatted = [
		nip.slice(0, 3),
		nip.slice(3, 6),
		nip.slice(6, 8),
		nip.slice(8, 10),
	].join(' ');
	return formatted;
}