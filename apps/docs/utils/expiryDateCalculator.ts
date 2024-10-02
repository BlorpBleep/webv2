/**
 * Calculates the new expiry date based on the current expiry and duration.
 * @param {string | null} currentExpiry - The current expiry date in ISO 8601 format or null.
 * @param {number} durationMonths - The duration to add in months.
 * @returns {string} The new expiry date in ISO 8601 format.
 */
// utils/expiryDateCalculator.ts

export function calculateNewExpiry(currentExpiry: Date | null, durationMonths: number): Date {
  const expiry = currentExpiry ? new Date(currentExpiry) : new Date();
  expiry.setMonth(expiry.getMonth() + durationMonths);
  return expiry;
}
