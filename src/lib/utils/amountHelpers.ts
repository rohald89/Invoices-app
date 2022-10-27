/**
 *
 * @param {number} cents
 * @returns {string} dollars
 */

export const centsToDollars = (cents: number): string => {
  const amount = cents / 100;
  return amount.toLocaleString(navigator.language, {
    style: 'currency',
    currency: navigator.language === 'en-US' ? 'USD' : 'EUR'
  });
};
