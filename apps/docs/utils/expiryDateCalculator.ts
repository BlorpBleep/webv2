// File: apps/docs/utils/expiryDateCalculator.ts

/**
 * Calculates the new expiry date based on the current expiry and duration.
 * @param {string | null} currentExpiry - The current expiry date in ISO 8601 format or null.
 * @param {number} durationMonths - The duration to add in months.
 * @returns {string} The new expiry date in ISO 8601 format.
 */
export function calculateNewExpiry(currentExpiry: string | null, durationMonths: number): string {
  const currentDate = currentExpiry ? new Date(currentExpiry) : new Date();
  currentDate.setMonth(currentDate.getMonth() + durationMonths);
  return currentDate.toISOString();
}