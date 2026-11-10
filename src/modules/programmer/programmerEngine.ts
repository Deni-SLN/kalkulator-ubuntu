export type WordSize = 'QWORD' | 'DWORD' | 'WORD' | 'BYTE';
export type NumberBase = 'HEX' | 'DEC' | 'OCT' | 'BIN';

export const WORD_SIZE_BITS: Record<WordSize, number> = {
  QWORD: 64,
  DWORD: 32,
  WORD: 16,
  BYTE: 8,
};

export const WORD_SIZE_MASKS: Record<WordSize, bigint> = {
  QWORD: 0xFFFFFFFFFFFFFFFFn,
  DWORD: 0xFFFFFFFFn,
  WORD: 0xFFFFn,
  BYTE: 0xFFn,
};

export function maskToWordSize(val: bigint, size: WordSize): bigint {
  const mask = WORD_SIZE_MASKS[size];
  return val & mask;
}

export function formatBase(val: bigint, base: NumberBase, size: WordSize): string {
  const masked = maskToWordSize(val, size);
  switch (base) {
    case 'HEX':
      return masked.toString(16).toUpperCase();
    case 'DEC':
      // As signed or unsigned
      return masked.toString(10);
    case 'OCT':
      return masked.toString(8);
    case 'BIN':
      return masked.toString(2);
  }
}

export function parseInput(str: string, base: NumberBase, size: WordSize): bigint {
  if (!str || str === '0') return 0n;
  try {
    const val = BigInt(
      base === 'HEX' ? '0x' + str : base === 'OCT' ? '0o' + str : base === 'BIN' ? '0b' + str : str
    );
    return maskToWordSize(val, size);
  } catch {
    return 0n;
  }
}

export function executeBitwiseOp(
  a: bigint,
  b: bigint,
  op: 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'Lsh' | 'Rsh',
  size: WordSize
): bigint {
  const mask = WORD_SIZE_MASKS[size];
  let res = 0n;
  switch (op) {
    case 'AND':
      res = a & b;
      break;
    case 'OR':
      res = a | b;
      break;
    case 'XOR':
      res = a ^ b;
      break;
    case 'NAND':
      res = ~(a & b);
      break;
    case 'NOR':
      res = ~(a | b);
      break;
    case 'Lsh':
      res = a << (b & 63n);
      break;
    case 'Rsh':
      res = a >> (b & 63n);
      break;
  }
  return res & mask;
}
