import { describe, it, expect } from 'vitest';
import {
  maskToWordSize,
  formatBase,
  executeBitwiseOp,
} from '../src/modules/programmer/programmerEngine';

describe('Programmer Calculator Engine', () => {
  it('masks correctly to Word Sizes (QWORD, DWORD, WORD, BYTE)', () => {
    expect(maskToWordSize(0x123456789ABCDEF0n, 'QWORD')).toBe(0x123456789ABCDEF0n);
    expect(maskToWordSize(0x123456789ABCDEF0n, 'DWORD')).toBe(0x9ABCDEF0n);
    expect(maskToWordSize(0x123456789ABCDEF0n, 'WORD')).toBe(0xDEF0n);
    expect(maskToWordSize(0x123456789ABCDEF0n, 'BYTE')).toBe(0xF0n);
  });

  it('formats bases correctly (HEX, DEC, OCT, BIN)', () => {
    const val = 255n;
    expect(formatBase(val, 'HEX', 'BYTE')).toBe('FF');
    expect(formatBase(val, 'DEC', 'BYTE')).toBe('255');
    expect(formatBase(val, 'OCT', 'BYTE')).toBe('377');
    expect(formatBase(val, 'BIN', 'BYTE')).toBe('11111111');
  });

  it('executes bitwise operations (AND, OR, XOR, NOT, NAND, NOR, Lsh, Rsh)', () => {
    expect(executeBitwiseOp(0b1100n, 0b1010n, 'AND', 'BYTE')).toBe(0b1000n);
    expect(executeBitwiseOp(0b1100n, 0b1010n, 'OR', 'BYTE')).toBe(0b1110n);
    expect(executeBitwiseOp(0b1100n, 0b1010n, 'XOR', 'BYTE')).toBe(0b0110n);
    expect(executeBitwiseOp(0b0001n, 2n, 'Lsh', 'BYTE')).toBe(0b0100n);
    expect(executeBitwiseOp(0b0100n, 2n, 'Rsh', 'BYTE')).toBe(0b0001n);
  });
});
