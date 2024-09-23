// File: apps/docs/utils/voucherCodeGenerator.ts

import { randomInt } from 'crypto';

/**
 * Generates a secure 16-digit numeric voucher code.
 * @returns {string} A 16-digit voucher code as a string.
 */
export function generateVoucherCode(): string {
  let code = '';
  for (let i = 0; i < 16; i++) {
    code += randomInt(0, 10).toString();
  }
  return code;
}