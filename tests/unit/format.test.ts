import { formatBankAccount, formatNIP } from '$lib/utilities/format';
import { describe, it, expect } from 'vitest';

describe('formatBankAccount', () => {
    it('should format a valid bank account number correctly', () => {
        const account = '12345678901234567890123456';
        const formatted = formatBankAccount(account);
        expect(formatted).toBe('12 3456 7890 1234 5678 9012 3456');
    });

    it('should handle a bank account number that is too short', () => {
        const account = '12345678901234567890';
        const formatted = formatBankAccount(account);
        expect(formatted).toBe('12345678901234567890');
    });

    it('should handle a bank account number that is too long', () => {
        const account = '123456789012345678901234567890';
        const formatted = formatBankAccount(account);
        expect(formatted).toBe('123456789012345678901234567890');
    });
});

describe('formatNIP', () => {
    it('should format a valid NIP number correctly', () => {
        const nip = '1234567890';
        const formatted = formatNIP(nip);
        expect(formatted).toBe('123 456 78 90');
    });

    it('should handle a NIP number that is too short', () => {
        const nip = '1234567';
        const formatted = formatNIP(nip);
        expect(formatted).toBe('1234567');
    });

    it('should handle a NIP number that is too long', () => {
        const nip = '1234567890123';
        const formatted = formatNIP(nip);
        expect(formatted).toBe('1234567890123');
    });
});