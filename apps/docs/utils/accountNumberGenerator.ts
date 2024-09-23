// File: apps/docs/utils/accountNumberGenerator.ts

import { randomInt } from 'crypto';

/**
 * Generates a secure 16-digit numeric account number.
 * @returns {string} A 16-digit account number as a string.
 */
export function generateAccountNumber(): string {
  let accountNumber = '';
  for (let i = 0; i < 16; i++) {
    accountNumber += randomInt(0, 10).toString();
  }
  return accountNumber;
}