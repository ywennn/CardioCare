export function formatTrendDate(isoString, period) {
  const date = new Date(isoString);
  if (period === '7d') {
    return date.toLocaleDateString('id-ID', { weekday: 'short' });
  }
  if (period === '30d') {
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  }
  if (period === '6m') {
    return date.toLocaleDateString('id-ID', { month: 'short' });
  }
  if (period === '1y') {
    return date.toLocaleDateString('id-ID', {
      month: 'short',
      year: '2-digit',
    });
  }
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}
