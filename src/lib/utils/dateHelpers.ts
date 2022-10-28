/**
 * convert yyyy-mm-dd to dd MMM yyyy
 */
export const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * convert date to yyyy-mm-dd
 * @param {Date} date
 */
export const formatDateForInput = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

/**
 * calculate dueDate from date and paymentTerms
 * @param {Date} date
 * @param {number} paymentTerms
 */

export const calculateDueDate = (date: Date, paymentTerms: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + paymentTerms);
  return formatDateForInput(d);
};
