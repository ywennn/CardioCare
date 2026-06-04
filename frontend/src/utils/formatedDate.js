export function formatScreeningDate(isoString) {
  const date = new Date(isoString);
  const dateStr = date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const timeStr =
    date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
    }) + ' WIB';

  return { dateStr, timeStr };
}
