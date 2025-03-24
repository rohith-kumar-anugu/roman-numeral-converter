"use strict";
/**
 * Roman Numeral Converter Service
 * Following the standard Roman numeral rules:
 * - Numbers are formed by combining symbols and adding their values
 * - Symbols are placed in order of value, starting with the largest
 * - When a smaller value precedes a larger value, the smaller value is subtracted from the larger value
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RomanNumeralService = void 0;
class RomanNumeralService {
    constructor() {
        // Roman numeral symbol mappings in descending order
        this.romanNumerals = [
            { value: 1000, symbol: 'M' },
            { value: 900, symbol: 'CM' },
            { value: 500, symbol: 'D' },
            { value: 400, symbol: 'CD' },
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' }
        ];
    }
    /**
     * Converts an integer to a Roman numeral
     * @param num - Integer to convert (must be between 1 and 3999)
     * @returns Roman numeral representation as a string
     * @throws Error if the input is not within valid range
     */
    convertToRoman(num) {
        // Validate the input
        if (!Number.isInteger(num)) {
            throw new Error('Input must be a whole number');
        }
        if (num < 1 || num > 3999) {
            throw new Error('Input must be between 1 and 3999');
        }
        let result = '';
        let remaining = num;
        // Iterate through the Roman numeral mappings
        for (const { value, symbol } of this.romanNumerals) {
            // While the remaining value is >= the current Roman numeral value
            while (remaining >= value) {
                // Add the symbol to the result
                result += symbol;
                // Subtract the value from the remaining amount
                remaining -= value;
            }
        }
        return result;
    }
}
exports.RomanNumeralService = RomanNumeralService;
