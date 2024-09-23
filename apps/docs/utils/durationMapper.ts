// File: apps/docs/utils/durationMapper.ts

/**
 * Maps Stripe Price IDs to voucher durations in months.
 * @param {string} priceId - The Stripe Price ID.
 * @returns {number} The duration in months.
 */
export function getDurationFromPriceId(priceId: string): number {
  const priceIdToDuration: { [key: string]: number } = {
    'price_1PveRWGUjDHrefXGMe5eRQ1u': 28, // 2 years and 4 months free (28 months) OTP
    'price_1PvefnGUjDHrefXGC7zUSNxX': 6,  // 6 months
    'price_1PvejuGUjDHrefXGtGSqOApF': 1,  // 1 month
    'price_1PvyY9GUjDHrefXGP5b3XVyF': 1,  // OTP

    // Testing products below
    'price_1Q28XbGUjDHrefXGFUbJdNSI': 28, // 2 years and 4 months free (28 months) OTP  
    'price_1Q28YeGUjDHrefXGTSihLp9x': 6,  // 6 month recurring
    'price_1Q28ZGGUjDHrefXGFSfhg3eV': 1,  // 1 month recurring
    'price_1Q1mJVGUjDHrefXG1KqGN4a9': 1,  // OTP
        

  };

  const duration = priceIdToDuration[priceId];

  if (duration === undefined) {
    console.warn(`No duration mapped for price ID: ${priceId}. Defaulting to 1 month.`);
    return 1; // Default to 1 month if not mapped
  }

  return duration;
}