/*
How that even works?
There are 3 types of numbers that can be validated:
- NIP (Numer Identyfikacji Podatkowej)
- REGON (Rejestr Gospodarki Narodowej)
- KRS (Krajowy Rejestr Sądowy)

How to validate them?
NIP:
- NIP consists of 10 digits
- The last digit is a checksum
- First digit shouldn't be 0

REGON:
- REGON consists of 9 or 14 digits
- For 9 digits REGON, the last digit is a checksum
- For 14 digits REGON, the last digit is a checksum

KRS:
- KRS consists of 10 digits
- The first digit is 0

If NIP is valid, it's most likely a NIP number - we don't need to check for KRS
*/

function _validateNIPChecksum(nip: string): boolean {
	const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
	const digits = nip.split('').map((digit) => parseInt(digit));
	const sum = digits.slice(0, 9).reduce((acc, digit, index) => acc + digit * weights[index], 0);
	const checksum = sum % 11;
	return checksum === digits[9];
}

function _validateShortREGONChecksum(regon: string): boolean {
    const weights = [8, 9, 2, 3, 4, 5, 6, 7];
    const digits = regon.split('').map(digit => parseInt(digit));
    const sum = digits.slice(0, 8).reduce((acc, digit, index) => acc + digit * weights[index], 0);
    let checksum = sum % 11;
    if (checksum === 10) checksum = 0;
    return checksum === digits[8];
}

function _validateLongREGONChecksum(regon: string): boolean {
    if (!_validateShortREGONChecksum(regon.slice(0, 9))) return false;
    const weights = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];
    const digits = regon.split('').map(digit => parseInt(digit));
    const sum = digits.slice(0, 13).reduce((acc, digit, index) => acc + digit * weights[index], 0);
    let checksum = sum % 11;
    if (checksum === 10) checksum = 0;
    return checksum === digits[13];
}

function _isLongREGON(number: string): boolean {
	return number.length === 14 && validateLongREGONChecksum(number);
}

function _isShortREGON(number: string): boolean {
	return number.length === 9 && validateShortREGONChecksum(number);
}

function _isNIP(number: string): boolean {
	return number.length === 10 && validateNIPChecksum(number);
}

function _isKRS(number: string): boolean {
	return number.length === 10 && number[0] === '0';
}

function identifyNumber(number: string): string {
	if (_isLongREGON(number) || _isShortREGON(number)) {
		return 'REGON';
	}
	if (_isNIP(number)) {
		return 'NIP';
	}
	if (_isKRS(number)) {
		return 'KRS';
	}
	return 'Unknown';
}
