import { romanNumeralService } from './romanNumeralService';

describe('RomanNumeralService', () => {
  test('should convert 1 to I', () => {
    expect(romanNumeralService.convertToRoman(1)).toBe('I');
  });

  test('should convert 4 to IV', () => {
    expect(romanNumeralService.convertToRoman(4)).toBe('IV');
  });

  test('should convert 9 to IX', () => {
    expect(romanNumeralService.convertToRoman(9)).toBe('IX');
  });

  test('should convert 42 to XLII', () => {
    expect(romanNumeralService.convertToRoman(42)).toBe('XLII');
  });

  test('should convert 99 to XCIX', () => {
    expect(romanNumeralService.convertToRoman(99)).toBe('XCIX');
  });

  test('should convert 2023 to MMXXIII', () => {
    expect(romanNumeralService.convertToRoman(2023)).toBe('MMXXIII');
  });

  test('should convert 3999 to MMMCMXCIX', () => {
    expect(romanNumeralService.convertToRoman(3999)).toBe('MMMCMXCIX');
  });
});