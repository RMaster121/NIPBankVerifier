import { identifyNumber } from '$lib/utilities/input_type';
import { describe, it, expect } from 'vitest';

describe('identifyNumber', () => {
    describe('NIP', () => {
        it('should identify a valid NIP number', () => {
            expect(identifyNumber('1234563218')).toBe('NIP');
        });

        it('should return "Unknown" for an invalid NIP number', () => {
            expect(identifyNumber('1234563219')).toBe('Unknown');
        });
    });

    describe('REGON', () => {
        it('should identify a valid short REGON number', () => {
            expect(identifyNumber('123456785')).toBe('REGON');
        });

        it('should identify a valid long REGON number', () => {
            expect(identifyNumber('12345678512347')).toBe('REGON');
        });

        it('should return "Unknown" for an invalid short REGON number', () => {
            expect(identifyNumber('123456786')).toBe('Unknown');
        });

        it('should return "Unknown" for an invalid long REGON number', () => {
            expect(identifyNumber('12345678512348')).toBe('Unknown');
        });
    });

    describe('Invalid Length', () => {
        it('should return "Unknown" for a number with invalid length', () => {
            expect(identifyNumber('123')).toBe('Unknown');
            expect(identifyNumber('123456789012345')).toBe('Unknown');
        });
    });
});