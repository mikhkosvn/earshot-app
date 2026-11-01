import 'server-only';

const CRC32C_POLYNOMIAL = 0x82f63b78;
const BYTE_VALUES = 256;
const BITS_PER_BYTE = 8;
const ALL_BITS = 0xffffffff;
const LOW_BYTE = 0xff;

const tableEntry = (index: number) => {
  let value = index;
  for (let bit = 0; bit < BITS_PER_BYTE; bit += 1) {
    value = (value >>> 1) ^ (CRC32C_POLYNOMIAL & -(value & 1));
  }
  return value >>> 0;
};

const CRC32C_TABLE = Uint32Array.from({ length: BYTE_VALUES }, (_, index) =>
  tableEntry(index),
);

export const crc32c = (bytes: Uint8Array) => {
  let crc = ALL_BITS;
  for (const byte of bytes) {
    crc = CRC32C_TABLE[(crc ^ byte) & LOW_BYTE] ^ (crc >>> BITS_PER_BYTE);
  }
  return (crc ^ ALL_BITS) >>> 0;
};
