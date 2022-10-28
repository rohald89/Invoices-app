/**
 *
 * @param {number} cents
 * @returns {string} dollars
 */

export const centsToDollars = (cents: number): string => {
  const amount = cents / 100;
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};
