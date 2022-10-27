/**
 * convert yyyy-mm-dd to dd MMM yyyy
 */
export const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString(navigator.language, {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
